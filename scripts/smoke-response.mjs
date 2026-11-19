import { setTimeout as sleep } from "node:timers/promises";

function isRetryableStatus(status) {
  return status === 408 || status === 429 || status >= 500;
}

export async function readSmokeResponse(
  url,
  { attempts, timeoutMs, binary = false, ...options },
  { request = fetch, wait = sleep } = {},
) {
  if (!Number.isSafeInteger(attempts) || attempts < 1) {
    throw new RangeError("Smoke request attempts must be a positive integer.");
  }
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 2_147_483_647) {
    throw new RangeError("Smoke request timeout must be a positive integer in milliseconds.");
  }

  for (let attempt = 1; ; attempt += 1) {
    try {
      const response = await request(url, {
        ...options,
        method: "GET",
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (attempt === attempts || !isRetryableStatus(response.status)) {
        const body = binary
          ? new Uint8Array(await response.arrayBuffer())
          : await response.text();
        return { response, body };
      }

      await response.body?.cancel();
    } catch (error) {
      if (attempt === attempts) throw error;
    }

    await wait(attempt * 500);
  }
}
