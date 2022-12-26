import { isProduction } from "./env.ts";
import { oak } from "./deps_server.ts";
import { mainRouter } from "./routes/main.ts";

export const app = new oak.Application();

app.use(mainRouter.routes(), mainRouter.allowedMethods());

app.addEventListener("error", ({ error }) => {
  console.error("Uncaught error", error);
});

app.addEventListener("listen", ({ hostname, port, secure }) => {
  const origin = `${secure ? "https://" : "http://"}${hostname}`;
  console.log(`Listening on: ${origin}:${port}`);
});

if (import.meta.main) {
  await app.listen({
    port: isProduction() ? 80 : 9000,
  });
}
