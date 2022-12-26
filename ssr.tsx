import { App } from "./client/app.tsx";
import { tw } from "./client/twind.ts";
import { HelmetContext, HelmetProvider } from "$esm/react-helmet-async";
import TwindStream from "$esm/@twind/with-react/readableStream";
import { renderToReadableStream } from "$esm/react-dom/server";
import { StaticRouter } from "$esm/react-router-dom/server";
import serialize from "$esm/serialize-javascript";
import { Context } from "$x/oak/mod.ts";
import "./client/manifest.ts";

export const html = (
  { helmet }: {
    helmet: HelmetContext.HelmetServerState;
  },
) => {
  const headTags = [
    helmet.base.toString(),
    helmet.title.toString(),
    helmet.priority.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.style.toString(),
    helmet.script.toString(),
    helmet.noscript.toString(),
  ].filter((tag: string) => Boolean(tag));

  const env = {
    APP_ENV: Deno.env.get("APP_ENV"),
  };
  return {
    start: `\
<!DOCTYPE html>
<html class="h-full bg-white" ${helmet.htmlAttributes.toString()}>
  <head>
    ${headTags.join("\n    ")}
    <noscript><style>.js-only { display: none; }</style></noscript>
    <script>
      window.env = ${serialize(env, { isJSON: true })};
    </script>
    <script type="module" src="/build/main.js" defer></script>
  </head>
  <body class="h-full" ${helmet.bodyAttributes.toString()}>`,
    end: `
  </body>
</html>
`,
  };
};

const ServerApp = (
  {
    helmetContext,
    location,
  }: {
    helmetContext: HelmetContext;
    location: string;
  },
) => (
  <HelmetProvider context={helmetContext}>
    <StaticRouter location={location}>
      <App />
    </StaticRouter>
  </HelmetProvider>
);

const encoder = new TextEncoder();

export async function ssr(context: Context) {
  const { request, response } = context;
  const { pathname, search } = request.url;
  const location = `${pathname}${search}`;

  const helmetContext = {} as HelmetContext;
  const stream = await renderToReadableStream(
    <ServerApp helmetContext={helmetContext} location={location} />,
    {
      onError(error: unknown) {
        console.log("ssr error", error);
      },
    },
  );
  await stream.allReady;

  const { start, end } = html({
    helmet: helmetContext.helmet,
  });

  response.type = "html";
  response.body = stream
    .pipeThrough(
      new TransformStream({
        start(controller) {
          controller.enqueue(encoder.encode(start));
        },
        flush(controller) {
          controller.enqueue(encoder.encode(end));
        },
      }),
    )
    .pipeThrough(new TwindStream(tw));
}
