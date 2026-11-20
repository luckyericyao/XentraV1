import { setTimeout as sleep } from "node:timers/promises";

export async function readReleaseSnapshot(paths, expected, read, {
  attempts = 1,
  wait = sleep,
} = {}) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const pages = await Promise.all(paths.map((path) => read(path, attempt)));
    const mismatches = pages.flatMap(({ headers }, index) => {
      const revision = headers.get("x-xentra-revision");
      if (revision === expected) return [];
      const observed = /^[0-9a-f]{40}$/.test(revision || "")
        ? revision
        : revision === null ? "missing" : "invalid";
      return [`${paths[index]}: ${observed}`];
    });

    // Return the exact responses that passed; smoke still validates their status and content.
    if (!mismatches.length) return pages;
    if (attempt === attempts) {
      throw new Error(
        `Release ${expected} not ready after ${attempts} snapshot(s): ${mismatches.join("; ")}`,
      );
    }

    await wait(4000);
  }
}
