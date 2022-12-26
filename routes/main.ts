import { httpError, path } from "../deps_client.ts";
import { oak } from "../deps_server.ts";
import { ssr } from "../ssr.tsx";
const { isHttpError } = httpError;

export const mainRouter = new oak.Router()
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
  .use(oak.etag.factory())
  .get("/(.*)", async (context, next) => {
    const { request, response } = context;
    const { pathname } = request.url;
    if (path.extname(pathname) === "") {
      // response.status = 404;
      await ssr(context);
    } else {
      await next();
    }
  })
  .use(async (context) => {
    await context.send({ root: `${Deno.cwd()}/public` });
  });
