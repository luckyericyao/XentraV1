export async function inspectPublicDestinations(destinations, readPage, { revisionHeaders = new Map() } = {}) {
  const failures = [];
  const observed = new Map();
  let assertions = 0;

  // Keep requests sequential so the report does not burst traffic to one host.
  for (const destination of destinations) {
    const { url, markers = [] } = destination;
    const problems = [];

    try {
      const { response, body } = await readPage(destination);
      assertions += 1;
      if (!response.ok) {
        problems.push(`HTTP ${response.status}`);
      } else {
        assertions += 1;
        const contentType = response.headers.get("content-type") || "";
        if (!contentType.toLowerCase().includes("text/html")) {
          problems.push("expected an HTML response");
        } else {
          // Attribute a revision only to the origin that served the final HTML response.
          const origin = response.url ? new URL(response.url).origin : "";
          const revisionHeader = revisionHeaders.get(origin);
          if (revisionHeader) {
            const row = observed.get(origin) ?? { revisions: new Map(), missing: [], invalid: [] };
            const requested = new URL(url);
            const path = requested.origin === origin
              ? requested.pathname
              : `${requested.origin}${requested.pathname}`;
            const revision = response.headers.get(revisionHeader);
            if (revision === null) {
              row.missing.push(path);
            } else if (/^[0-9a-f]{40}$/.test(revision)) {
              const paths = row.revisions.get(revision) ?? [];
              paths.push(path);
              row.revisions.set(revision, paths);
            } else {
              row.invalid.push(path);
            }
            observed.set(origin, row);
          }

          for (const marker of markers) {
            assertions += 1;
            if (!body.includes(marker)) {
              problems.push(`missing ${JSON.stringify(marker)}`);
            }
          }
        }
      }
    } catch (error) {
      problems.push(error instanceof Error ? error.message : String(error));
    }

    if (problems.length) failures.push({ url, problems });
  }

  const revisionObservations = [...observed].map(([origin, { revisions, missing, invalid }]) => ({
    origin,
    revisions: [...revisions].sort(([first], [second]) => first.localeCompare(second)),
    missing,
    invalid,
  }));
  return { checked: destinations.length, assertions, failures, revisionObservations };
}

export async function observePublicApiRevision(url, readPage) {
  try {
    const { response, body } = await readPage(url);
    if (!response.ok || response.redirected || response.url !== url) {
      return { status: "unavailable" };
    }
    const mediaType = response.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
    if (mediaType !== "application/json") return { status: "invalid" };

    const data = JSON.parse(body);
    if (!data || typeof data !== "object" || Array.isArray(data)) return { status: "invalid" };
    if (!Object.hasOwn(data, "release")) return { status: "missing" };
    if (typeof data.release !== "string" || !/^[0-9a-f]{40}$/.test(data.release)) {
      return { status: "invalid" };
    }
    return { status: "observed", revision: data.release };
  } catch (error) {
    return { status: error instanceof SyntaxError ? "invalid" : "unavailable" };
  }
}
