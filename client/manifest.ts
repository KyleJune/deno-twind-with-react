import { ComponentType } from "$esm/react";
import * as path from "$std/path/mod.ts";

import { registerLazyFactory } from "./lazy.ts";

export interface Manifest {
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

export const routes = new Set<string>(["/"]);

function registerRoutes(basePath: string, manifest: Manifest) {
  for (const [routePath, route] of Object.entries(manifest)) {
    const pathname = path.join(basePath, routePath);
    routes.add(pathname)
    if (typeof route === "object") {
      registerRoutes(pathname, route);
    }
  }
}

registerRoutes("/", manifest.routes as Manifest);
