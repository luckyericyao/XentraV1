import assert from "node:assert/strict";
import test from "node:test";
import { openMobileNavigation } from "../src/lib/mobile-navigation.ts";

function createFixture({ overflow = "", desktop = false, linkCount = 4, footerInert = false } = {}) {
  const document = new EventTarget();
  const viewport = new EventTarget();
  viewport.matches = desktop;
  document.body = { style: { overflow } };

  function element(id, parent = null) {
    const node = {
      id,
      parent,
      inert: false,
      isConnected: true,
      focusCalls: [],
      focus(options) {
        for (let current = node; current; current = current.parent) {
          assert.equal(current.inert, false, `Cannot focus inert ${current.id}`);
        }
        node.focusCalls.push(options);
        document.activeElement = node;
      },
    };
    return node;
  }

  const main = element("main");
  const footer = element("footer");
  footer.inert = footerInert;
  const language = element("language");
  const background = [main, footer, language];
  const button = element("menu");
  const links = Array.from({ length: linkCount }, (_, index) => element(`link-${index}`));
  const destination = element("companies", main);
  document.activeElement = button;
  document.querySelectorAll = (selector) => {
    assert.equal(selector, "main, footer, [data-navigation-background]");
    return background;
  };
  document.querySelector = (selector) => {
    assert.equal(selector, "main");
    return main;
  };
  const navigation = {
    querySelectorAll(selector) {
      assert.equal(selector, "a[href]");
      return links;
    },
  };
  let closeCount = 0;
  const session = openMobileNavigation({
    document,
    desktopViewport: viewport,
    button,
    navigation,
    onClose: () => { closeCount += 1; },
  });

  return {
    document, viewport, main, footer, language, button, links, destination, session,
    closeCount: () => closeCount,
    key(key, shiftKey = false) {
      const event = new Event("keydown", { cancelable: true });
      Object.assign(event, { key, shiftKey });
      document.dispatchEvent(event);
      return event;
    },
    resize(desktop) {
      viewport.matches = desktop;
      viewport.dispatchEvent(new Event("change"));
    },
  };
}

test("opens with focus in navigation and excludes the background", () => {
  const fixture = createFixture();
  assert.equal(fixture.document.activeElement, fixture.links[0]);
  assert.equal(fixture.document.body.style.overflow, "hidden");
  for (const target of [fixture.main, fixture.footer, fixture.language]) {
    assert.equal(target.inert, true);
  }
  fixture.session.dispose();
});

test("Escape restores scroll, background access, and menu-button focus", () => {
  const fixture = createFixture({ overflow: "auto" });
  assert.equal(fixture.key("Escape").defaultPrevented, true);
  assert.equal(fixture.closeCount(), 1);
  fixture.session.dispose();
  assert.equal(fixture.document.body.style.overflow, "auto");
  assert.equal(fixture.main.inert, false);
  assert.equal(fixture.document.activeElement, fixture.button);
  assert.deepEqual(fixture.button.focusCalls.at(-1), { preventScroll: true });
});

test("a selected chapter receives focus after its inert state is restored", () => {
  const fixture = createFixture();
  fixture.session.close(fixture.destination);
  fixture.session.dispose();
  assert.equal(fixture.document.activeElement, fixture.destination);
  assert.equal(fixture.button.focusCalls.length, 0);
  assert.deepEqual(fixture.destination.focusCalls, [{ preventScroll: true }]);
});

test("crossing to desktop releases the session without focusing a hidden button", () => {
  const fixture = createFixture();
  fixture.resize(true);
  assert.equal(fixture.closeCount(), 1);
  fixture.session.dispose();
  assert.equal(fixture.document.body.style.overflow, "");
  assert.equal(fixture.document.activeElement, fixture.main);
  assert.equal(fixture.button.focusCalls.length, 0);
});

test("Tab and Shift+Tab include the close button in the focus loop", () => {
  const fixture = createFixture();
  fixture.links.at(-1).focus();
  assert.equal(fixture.key("Tab").defaultPrevented, true);
  assert.equal(fixture.document.activeElement, fixture.button);
  assert.equal(fixture.key("Tab", true).defaultPrevented, true);
  assert.equal(fixture.document.activeElement, fixture.links.at(-1));
  fixture.links[0].focus();
  assert.equal(fixture.key("Tab").defaultPrevented, false);
  fixture.session.dispose();
});

test("an empty navigation still has an operable close control", () => {
  const fixture = createFixture({ linkCount: 0 });
  assert.equal(fixture.document.activeElement, fixture.button);
  assert.equal(fixture.key("Tab").defaultPrevented, true);
  fixture.key("Escape");
  assert.equal(fixture.closeCount(), 1);
  fixture.session.dispose();
});

test("cleanup is idempotent and removes keyboard and viewport listeners", () => {
  const fixture = createFixture();
  fixture.session.dispose();
  const focusCount = fixture.button.focusCalls.length;
  fixture.session.dispose();
  fixture.key("Escape");
  fixture.resize(true);
  assert.equal(fixture.closeCount(), 0);
  assert.equal(fixture.button.focusCalls.length, focusCount);
});

test("outbound navigation does not steal focus back before leaving the page", () => {
  const fixture = createFixture();
  fixture.session.close(null);
  fixture.session.dispose();
  assert.equal(fixture.button.focusCalls.length, 0);
  assert.equal(fixture.main.inert, false);
});

test("a removed focus destination is not focused", () => {
  const fixture = createFixture();
  fixture.destination.isConnected = false;
  fixture.session.close(fixture.destination);
  fixture.session.dispose();
  assert.equal(fixture.destination.focusCalls.length, 0);
});

test("cleanup preserves a background element that was already inert", () => {
  const fixture = createFixture({ footerInert: true });
  fixture.session.dispose();
  assert.equal(fixture.footer.inert, true);
  assert.equal(fixture.main.inert, false);
});
