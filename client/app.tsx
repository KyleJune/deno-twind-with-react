import { lazy } from "$npm/react";
import { Helmet } from "$npm/react-helmet-async";
import { Route, Routes } from "$npm/react-router-dom";

import { Index, Layout } from "./routes/index.tsx";

const Anything = lazy(() => import("./routes/anything.tsx"));

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
