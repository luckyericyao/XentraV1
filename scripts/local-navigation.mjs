// Inspect Next's generated markup, not client state or external destinations.
export function inspectLocalNavigation(pages, origin) {
  const index = new Map(pages.map(({ path, html }) => [
    path,
    new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1])),
  ]));
  const checks = [];

  for (const { path, html } of pages) {
    for (const match of html.matchAll(/<a\b[^>]*\shref="([^"]*)"[^>]*>/g)) {
      const href = match[1];
      let target;

      try {
        target = new URL(href, new URL(path, origin));
      } catch {
        checks.push({ path, href, error: "invalid URL" });
        continue;
      }

      if (!["http:", "https:", "mailto:"].includes(target.protocol)) {
        checks.push({ path, href, error: "unsupported link protocol" });
        continue;
      }
      if (target.origin !== new URL(origin).origin) {
        continue;
      }

      const ids = index.get(target.pathname);
      let error = ids ? null : "missing local page";
      if (ids && target.hash) {
        try {
          if (!ids.has(decodeURIComponent(target.hash.slice(1)))) {
            error = "missing anchor target";
          }
        } catch {
          error = "invalid anchor encoding";
        }
      }
      checks.push({ path, href, error });
    }
  }

  return checks;
}
