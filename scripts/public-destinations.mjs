export async function inspectPublicDestinations(destinations, readPage) {
  const failures = [];
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

  return { checked: destinations.length, assertions, failures };
}
