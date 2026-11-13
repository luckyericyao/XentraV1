import assert from "node:assert/strict";
import { access, mkdir, mkdtemp, readFile, realpath, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { withCheckWorkspace } from "./local-check-workspace.mjs";

async function fixture(t) {
  const parent = fileURLToPath(new URL("../artifacts/local-workspace-tests/", import.meta.url));
  await mkdir(parent, { recursive: true });
  const root = await mkdtemp(join(parent, "source-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  for (const directory of ["scripts", "src", "public", ".next", "node_modules"]) {
    await mkdir(join(root, directory));
  }
  for (const file of [
    ".gitignore", "package.json", "tsconfig.json", "next.config.ts",
    "postcss.config.mjs", "eslint.config.mjs", "src/example.ts", "public/example.txt",
    ".env.production.local", "src/.env.local", "next-env.d.ts",
  ]) {
    await writeFile(join(root, file), "synthetic");
  }
  await writeFile(join(root, ".next", "BUILD_ID"), "existing-preview");
  return root;
}

test("the isolated workspace copies code without deployment files or the preview build", async (t) => {
  const root = await fixture(t);
  let workspace;
  await withCheckWorkspace(root, async (directory) => {
    workspace = directory;
    assert.equal(await readFile(join(workspace, "src", "example.ts"), "utf8"), "synthetic");
    assert.equal(await readFile(join(workspace, "public", "example.txt"), "utf8"), "synthetic");
    assert.equal(await realpath(join(workspace, "node_modules")), await realpath(join(root, "node_modules")));
    for (const path of [".env.production.local", "src/.env.local", ".next", "next-env.d.ts"]) {
      await assert.rejects(access(join(workspace, path)), { code: "ENOENT" });
    }
    await mkdir(join(workspace, ".next"));
    await writeFile(join(workspace, ".next", "BUILD_ID"), "synthetic-build");
  });
  assert.equal(await readFile(join(root, ".next", "BUILD_ID"), "utf8"), "existing-preview");
  await assert.rejects(access(workspace), { code: "ENOENT" });
});

test("a failed workspace check removes only its own files", async (t) => {
  const root = await fixture(t);
  let workspace;
  await assert.rejects(withCheckWorkspace(root, (directory) => {
    workspace = directory;
    throw new Error("synthetic build failure");
  }), /synthetic build failure/);
  await assert.rejects(access(workspace), { code: "ENOENT" });
  assert.equal(await readFile(join(root, ".next", "BUILD_ID"), "utf8"), "existing-preview");
});

test("cancelling a check removes its workspace", async (t) => {
  const root = await fixture(t);
  const controller = new AbortController();
  let workspace;
  await assert.rejects(withCheckWorkspace(root, (directory) => {
    workspace = directory;
    controller.abort();
    controller.signal.throwIfAborted();
  }, { signal: controller.signal }), { name: "AbortError" });
  await assert.rejects(access(workspace), { code: "ENOENT" });
});
