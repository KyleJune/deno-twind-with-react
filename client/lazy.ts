import * as path from "$std/path/mod.ts";
import { isBrowser } from "../env.ts";
import { lazy } from "$esm/react";

/** Map of pre-loaded lazy modules. This is only used on the server. */
// deno-lint-ignore no-explicit-any
const lazyMap = new Map<string, React.ComponentType<any>>();

export const clientDir = path.dirname(import.meta.url);
console.log(clientDir);

/** Factory that generates a wrapper around `React.lazy` that supports static imports on the server. */
export const lazyFactory = (moduleUrl: string) => {
  const dir = isBrowser()
    ? ""
    : path.dirname(path.relative(clientDir, moduleUrl));
  return <T>(
    relativePath: string,
    dynamicFactory: () => Promise<{ default: React.ComponentType<T> }>,
  ) =>
    lazy(
      isBrowser() ? dynamicFactory : async () => {
        const pathFromClient = path.join(dir, relativePath);
        if (!lazyMap.has(pathFromClient)) {
          console.log("Loaded modules", [...lazyMap.keys()]);
          throw new Error(
            `module (${pathFromClient}) not pre-loaded`,
          );
        }
        const Component = lazyMap.get(pathFromClient)!;
        return await Promise.resolve({ default: Component });
      },
    );
};

export const registerLazyFactory = (relativeDir: string) => {
  // deno-lint-ignore no-explicit-any
  return (relativePath: string, Component: React.ComponentType<any>) => {
    const pathFromClient = path.join(relativeDir, relativePath);
    lazyMap.set(pathFromClient, Component);
  };
};
