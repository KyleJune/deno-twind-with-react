import { denoPlugin, esbuild } from "./deps_build.ts";
import { isProduction } from "./env.ts";

export async function bundle(options: esbuild.BuildOptions) {
  await esbuild.build({
    plugins: [
      denoPlugin({
        importMapURL: new URL("./import_map.json", import.meta.url),
      }),
    ],
    entryPoints: ["./client/main.tsx"],
    outdir: "./public/build",
    bundle: true,
    splitting: true,
    minify: true,
    format: "esm",
    jsx: "automatic",
    ...options,
  });
  return () => esbuild.stop();
}

if (import.meta.main) {
  const options: esbuild.BuildOptions = {};
  if (!isProduction()) {
    options.jsxDev = true;
    options.sourcemap = "external";
  }
  const stop = (await bundle(options));
  if (!options.watch) stop();
}
