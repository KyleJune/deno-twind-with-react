import * as esbuild from "$x/esbuild/mod.js";
import { denoPlugin } from "$x/esbuild_deno_loader/mod.ts";
import { isProduction } from "./env.ts";

export async function build(options: esbuild.BuildOptions) {
  const importMapURL = new URL(
    isProduction()
      ? "./import_map.json"
      : "./import_map.json",
    import.meta.url,
  );

  await esbuild.build({
    plugins: [
      denoPlugin({
        importMapURL,
      }),
    ],
    entryPoints: ["./client/main.tsx"],
    outdir: "./public/build",
    bundle: true,
    splitting: true,
    minify: true,
    format: "esm",
    jsx: "automatic",
    jsxImportSource: "$esm/react",
    ...options,
  });
  return () => esbuild.stop();
}

if (import.meta.main) {
  const options: esbuild.BuildOptions = {};
  if (!isProduction()) {
    options.jsxDev = true;
    options.sourcemap = "linked";
  }
  const stop = (await build(options));
  if (!options.watch) stop();
}
