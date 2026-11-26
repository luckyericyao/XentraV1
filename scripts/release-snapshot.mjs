import { setTimeout as sleep } from "node:timers/promises";

export async function readReleaseSnapshot(paths, expected, read, {
  attempts = 1,
  wait = sleep,
} = {}) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const results = await Promise.allSettled(paths.map(async (path) => read(path, attempt)));
    const mismatches = results.flatMap((result, index) => {
      if (result.status === "rejected") return [`${paths[index]}: unavailable`];
      const revision = result.value.headers.get("x-xentra-revision");
      if (revision === expected) return [];
      const observed = /^[0-9a-f]{40}$/.test(revision || "")
        ? revision
        : revision === null ? "missing" : "invalid";
      return [`${paths[index]}: ${observed}`];
    });

    // Return the exact responses that passed; smoke still validates their status and content.
    if (!mismatches.length) return results.map(({ value }) => value);
    if (attempt === attempts) {
      const firstFailure = results.find(({ status }) => status === "rejected");
      throw new Error(
        `Release ${expected} not ready after ${attempts} snapshot(s): ${mismatches.join("; ")}`,
        firstFailure ? { cause: firstFailure.reason } : undefined,
      );
    }

    await wait(4000);
  }
}
