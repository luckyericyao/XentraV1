import assert from "node:assert/strict";
import test from "node:test";
import { openMobileNavigation } from "../src/lib/mobile-navigation.ts";

function createFixture({ overflow = "", desktop = false, linkCount = 4, footerInert = false } = {}) {
  const document = new EventTarget();
  const view = new EventTarget();
  view.location = { hash: "" };
  document.defaultView = view;
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
  destination.hasAttribute = (name) => name === "tabindex";
  document.getElementById = (id) => id === destination.id ? destination : null;
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
    scrollTop: 120,
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
    document, viewport, main, footer, language, button, links, navigation, destination, session,
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
    traverse(hash) {
      view.location.hash = hash;
      view.dispatchEvent(new Event("popstate"));
    },
    showPage(persisted, hash = "") {
      view.location.hash = hash;
      const event = new Event("pageshow");
      Object.assign(event, { persisted });
      view.dispatchEvent(event);
    },
  };
}

test("opens with focus in navigation and excludes the background", () => {
  const fixture = createFixture();
  assert.equal(fixture.document.activeElement, fixture.links[0]);
  assert.deepEqual(fixture.links[0].focusCalls, [{ preventScroll: true }]);
  assert.equal(fixture.navigation.scrollTop, 0);
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

test("history traversal closes the menu and focuses the restored chapter or main", () => {
  for (const [hash, name] of [["", "main"], ["#companies", "destination"], ["#unknown", "main"]]) {
    const fixture = createFixture({ overflow: "auto" });
    fixture.traverse(hash);
    assert.equal(fixture.closeCount(), 1);
    fixture.session.dispose();
    assert.equal(fixture.document.body.style.overflow, "auto");
    assert.equal(fixture.main.inert, false);
    assert.equal(fixture.document.activeElement, fixture[name]);
  }
});

test("history events do not override the focus destination of a link already closing the menu", () => {
  const fixture = createFixture();
  fixture.session.close(fixture.destination);
  fixture.traverse("");
  assert.equal(fixture.closeCount(), 1);
  fixture.session.dispose();
  assert.equal(fixture.document.activeElement, fixture.destination);
});

test("a cached page closes the menu without reacting to the first pageshow", () => {
  const fixture = createFixture({ overflow: "auto" });
  fixture.showPage(false);
  assert.equal(fixture.closeCount(), 0);
  assert.equal(fixture.main.inert, true);
  fixture.showPage(true, "#companies");
  assert.equal(fixture.closeCount(), 1);
  fixture.session.dispose();
  assert.equal(fixture.main.inert, false);
  assert.equal(fixture.document.body.style.overflow, "auto");
  assert.equal(fixture.document.activeElement, fixture.destination);
  assert.deepEqual(fixture.destination.focusCalls, [{ preventScroll: true }]);
});

test("crossing to desktop releases the session without focusing a hidden button", () => {
  const fixture = createFixture();
  fixture.resize(true);
  fixture.traverse("#companies");
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
  assert.deepEqual(fixture.button.focusCalls.at(-1), { preventScroll: true });
  assert.equal(fixture.key("Tab", true).defaultPrevented, true);
  assert.equal(fixture.document.activeElement, fixture.links.at(-1));
  assert.deepEqual(fixture.links.at(-1).focusCalls.at(-1), { preventScroll: false });
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
  fixture.traverse("#companies");
  fixture.showPage(true, "#companies");
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
