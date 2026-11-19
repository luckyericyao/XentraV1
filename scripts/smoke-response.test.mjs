import assert from "node:assert/strict";
import { setTimeout as sleep } from "node:timers/promises";
import test from "node:test";
import { readSmokeResponse } from "./smoke-response.mjs";

const url = "https://smoke.example.test/page";
const defaults = { attempts: 3, timeoutMs: 100 };
const noWait = async () => {};

test("an expired attempt gets a fresh timeout signal and budget", async () => {
  const signals = [];
  const result = await readSmokeResponse(url, { ...defaults, timeoutMs: 30 }, {
    wait: noWait,
    async request(_url, { method, signal }) {
      assert.equal(method, "GET");
      signals.push(signal);
      if (signals.length === 1) {
        await sleep(70);
        signal.throwIfAborted();
      }
      assert.equal(signal.aborted, false);
      return new Response("recovered");
    },
  });
  assert.equal(signals.length, 2);
  assert.equal(signals[0].aborted, true);
  assert.notEqual(signals[0], signals[1]);
  assert.equal(result.body, "recovered");
});

test("a body read failure is retried and binary reads preserve bytes", async () => {
  let requests = 0;
  const bytes = Uint8Array.of(0, 137, 255);
  const result = await readSmokeResponse(url, { ...defaults, binary: true }, {
    wait: noWait,
    async request() {
      if (++requests === 1) {
        const response = new Response();
        response.arrayBuffer = async () => { throw new Error("stream interrupted"); };
        return response;
      }
      return new Response(bytes);
    },
  });
  assert.equal(requests, 2);
  assert.deepEqual(result.body, bytes);
});

test("retryable responses cancel unused bodies and return the final status at the limit", async () => {
  const responses = [new Response("temporary", { status: 503 }), new Response("limited", { status: 429 })];
  const [initial, final] = responses;
  const waits = [];
  const result = await readSmokeResponse(url, { ...defaults, attempts: 2 }, {
    wait: async (milliseconds) => { waits.push(milliseconds); },
    request: async () => responses.shift(),
  });
  assert.equal(initial.bodyUsed, true);
  assert.deepEqual(waits, [500]);
  assert.equal(result.response, final);
  assert.equal(result.body, "limited");
});

test("a complete 404 is returned without retrying", async () => {
  let requests = 0;
  const result = await readSmokeResponse(url, defaults, {
    wait: noWait,
    async request() {
      requests += 1;
      return new Response("missing", { status: 404 });
    },
  });
  assert.equal(requests, 1);
  assert.equal(result.response.status, 404);
});

test("exhausted transport failures preserve the final cause", async () => {
  let requests = 0;
  await assert.rejects(readSmokeResponse(url, defaults, {
    wait: noWait,
    async request() { throw new Error(`connection ${++requests}`); },
  }), { message: "connection 3" });
});
