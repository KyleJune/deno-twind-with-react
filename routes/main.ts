import * as path from "$std/path/mod.ts";
import { isHttpError } from "$x/http_error/mod.ts";
import { Router, etag } from "$x/oak/mod.ts";
import { ssr } from "../ssr.tsx";
import { manifest } from "../client/manifest.ts";

const existingPaths = new Set();
for (const key of Object.keys(manifest)) {

}


export const mainRouter = new Router()
  .use(async (context, next) => {
    const { request, response } = context;
    console.log(request.method, request.url.href);
    const start = Date.now();
    try {
      await next();
    } catch (cause) {
      console.error("route error", cause);

      response.status = isHttpError(cause) ? cause.status : 500;
      const ext = path.extname(request.url.pathname);
      if (ext === "") {
        await ssr(context);
      }
    } finally {
      const dt = Date.now() - start;
      response.headers.set("X-Response-Time", `${dt}ms`);
    }
  })
  .use(etag.factory())
  .get("/(.*)", async (context, next) => {
    const { request, response } = context;
    const { pathname } = request.url;
    if (path.extname(pathname) === "") {
      console.log('pathname', pathname);
      if (existingPaths.has(pathname)) {
        response.status = 404;
      }
      await ssr(context);
    } else {
      await next();
    }
  })
  .use(async (context) => {
    await context.send({ root: `${Deno.cwd()}/public` });
  });
