type MobileNavigationOptions = {
  document: Document;
  desktopViewport: MediaQueryList;
  button: HTMLButtonElement;
  navigation: HTMLElement;
  onClose: () => void;
};

export function openMobileNavigation({
  document,
  desktopViewport,
  button,
  navigation,
  onClose,
}: MobileNavigationOptions) {
  const previousOverflow = document.body.style.overflow;
  const background = Array.from(
    document.querySelectorAll<HTMLElement>(
      "main, footer, [data-navigation-background]",
    ),
    (element) => ({ element, inert: element.inert }),
  );
  const links = Array.from(
    navigation.querySelectorAll<HTMLAnchorElement>("a[href]"),
  );
  const focusOrder: HTMLElement[] = [button, ...links];
  let focusOnClose: HTMLElement | null = button;
  let disposed = false;
  let closing = false;

  const close = (destination: HTMLElement | null = button) => {
    if (closing || disposed) return;
    closing = true;
    focusOnClose = destination;
    onClose();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const index = focusOrder.indexOf(document.activeElement as HTMLElement);

    if (index === -1 || (event.shiftKey && index === 0)) {
      event.preventDefault();
      const target = focusOrder[event.shiftKey ? focusOrder.length - 1 : 0];
      target.focus({ preventScroll: target === button });
    } else if (!event.shiftKey && index === focusOrder.length - 1) {
      event.preventDefault();
      button.focus({ preventScroll: true });
    }
  };

  const onViewportChange = () => {
    if (desktopViewport.matches) {
      close(document.querySelector<HTMLElement>("main"));
    }
  };

  const view = document.defaultView;
  const onHistoryChange = () => {
    const target = document.getElementById(view?.location.hash.slice(1) ?? "");
    close(target?.hasAttribute("tabindex") ? target : document.querySelector<HTMLElement>("main"));
  };
  const onPageShow = (event: PageTransitionEvent) => {
    if (event.persisted) onHistoryChange();
  };

  document.body.style.overflow = "hidden";
  for (const { element } of background) {
    element.inert = true;
  }
  // Reset only the menu scroller; focusing during its entrance can move the page.
  navigation.scrollTop = 0;
  (links[0] ?? button).focus({ preventScroll: true });
  document.addEventListener("keydown", onKeyDown);
  desktopViewport.addEventListener("change", onViewportChange);
  view?.addEventListener("popstate", onHistoryChange);
  view?.addEventListener("pageshow", onPageShow);
  onViewportChange();

  return {
    close,
    dispose() {
      if (disposed) {
        return;
      }

      disposed = true;
      document.removeEventListener("keydown", onKeyDown);
      desktopViewport.removeEventListener("change", onViewportChange);
      view?.removeEventListener("popstate", onHistoryChange);
      view?.removeEventListener("pageshow", onPageShow);
      document.body.style.overflow = previousOverflow;
      for (const { element, inert } of background) {
        element.inert = inert;
      }

      // A resized viewport may have hidden the original menu button.
      const destination =
        focusOnClose === button && desktopViewport.matches
          ? document.querySelector<HTMLElement>("main")
          : focusOnClose;
      if (destination?.isConnected) {
        destination.focus({ preventScroll: true });
      }
    },
  };
}
