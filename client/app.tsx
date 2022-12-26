import { Helmet, reactRouter } from "../deps_client.ts";
import { lazyFactory } from "./lazy.ts";
import { Index, Layout } from "./routes/index.tsx";
const { Routes, Route } = reactRouter;

const lazy = lazyFactory(import.meta.url);
const Anything = lazy(
  "./routes/anything.tsx",
  () => import("./routes/anything.tsx"),
);

export function App() {
  return (
    <>
      <Helmet
        htmlAttributes={{ lang: "en" }}
        defaultTitle="Example"
        titleTemplate="Example | %s"
      >
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="anything" element={<Anything />} />
          <Route path="*" element={<h1>Not found!</h1>} />
        </Route>
      </Routes>
    </>
  );
}