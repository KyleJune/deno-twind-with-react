import { ComponentType } from "$esm/react";

import { registerLazyFactory } from "./lazy.ts";

interface Manifest {
  // deno-lint-ignore no-explicit-any
  [key: string]: Manifest | ComponentType<any>;
}

function registerManifest(dir: string, manifest: Manifest) {
  const registerLazy = registerLazyFactory(dir);
  for (const [routePath, route] of Object.entries(manifest)) {
    if (typeof route === "object") {
      registerManifest(routePath, route);
    } else {
      registerLazy(`${routePath}.tsx`, route);
    }
  }
}

import Anything from "./routes/anything.tsx";

export const manifest = {
  "routes": {
    "anything": Anything,
  },
} as Manifest;

registerManifest(".", manifest);
