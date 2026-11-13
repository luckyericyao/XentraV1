import assert from "node:assert/strict";
import test from "node:test";
import { getReadingHash } from "../src/lib/reading-position.ts";

test("the hero and an empty page resolve to the top", () => {
  assert.equal(getReadingHash([], 200), "#top");
  assert.equal(getReadingHash([{ id: "thesis", top: 300 }], 200), "#top");
});

test("the reading marker selects the current chapter rather than an earlier navigation section", () => {
  assert.equal(getReadingHash([
    { id: "companies", top: -1800 },
    { id: "portfolio", top: -1200 },
    { id: "ai-agent-coach-chapter", top: -600 },
    { id: "localhost-chapter", top: 180 },
    { id: "bioaxis-chapter", top: 1400 },
  ], 220), "#localhost-chapter");
});

test("scrolling back up leaves a chapter when it is below the reading marker", () => {
  assert.equal(getReadingHash([
    { id: "companies", top: -600 },
    { id: "portfolio", top: 100 },
    { id: "localhost-chapter", top: 900 },
  ], 200), "#portfolio");
});

test("position rather than candidate order determines the closest section", () => {
  assert.equal(getReadingHash([
    { id: "model", top: 180 },
    { id: "companies", top: -1800 },
    { id: "contact", top: 800 },
  ], 180), "#model");
});

test("a nested chapter wins when its parent has the same top", () => {
  assert.equal(getReadingHash([
    { id: "portfolio", top: 100 },
    { id: "ai-agent-coach-chapter", top: 100 },
  ], 200), "#ai-agent-coach-chapter");
});

test("invalid positions and unnamed sections cannot create broken fragments", () => {
  assert.equal(getReadingHash([
    { id: "", top: 100 },
    { id: "invalid", top: NaN },
    { id: "infinite", top: -Infinity },
    { id: "contact", top: 180 },
  ], 200), "#contact");
  assert.equal(getReadingHash([{ id: "contact", top: 100 }], NaN), "#top");
});
