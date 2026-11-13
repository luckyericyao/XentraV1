import { cp, mkdir, mkdtemp, rm, symlink } from "node:fs/promises";
import { basename, join } from "node:path";

const inputs = [
  ".gitignore", "package.json", "tsconfig.json", "next.config.ts",
  "postcss.config.mjs", "eslint.config.mjs", "scripts", "src", "public",
];

export async function withCheckWorkspace(root, inspect, { signal } = {}) {
  signal?.throwIfAborted();
  const directory = join(root, "artifacts", "local-checks");
  await mkdir(directory, { recursive: true });
  const workspace = await mkdtemp(join(directory, "workspace-"));

  try {
    for (const entry of inputs) {
      signal?.throwIfAborted();
      await cp(join(root, entry), join(workspace, entry), {
        recursive: true,
        filter: (source) => !basename(source).startsWith(".env"),
      });
    }
    // Reuse installed dependencies and the ancestor lockfile, not the preview build.
    await symlink(
      join(root, "node_modules"),
      join(workspace, "node_modules"),
      process.platform === "win32" ? "junction" : "dir",
    );
    signal?.throwIfAborted();
    return await inspect(workspace);
  } finally {
    await rm(workspace, { recursive: true, force: true });
  }
}
