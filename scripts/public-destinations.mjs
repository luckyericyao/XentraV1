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
            const row = observed.get(origin) ?? { revisions: new Set(), published: 0, missing: 0, invalid: 0 };
            const revision = response.headers.get(revisionHeader);
            if (revision === null) {
              row.missing += 1;
            } else if (/^[0-9a-f]{40}$/.test(revision)) {
              row.revisions.add(revision);
              row.published += 1;
            } else {
              row.invalid += 1;
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

  const revisionObservations = [...observed].map(([origin, { revisions, ...counts }]) => ({
    origin, revisions: [...revisions].sort(), ...counts,
  }));
  return { checked: destinations.length, assertions, failures, revisionObservations };
}
