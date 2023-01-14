// for the side effect of creating the global twind instance
import "./twind.ts";

import { startTransition, StrictMode } from "$npm/react";
import { HelmetProvider } from "$npm/react-helmet-async";
import { hydrateRoot } from "$npm/react-dom/client";
import { BrowserRouter } from "$npm/react-router-dom";
import { App } from "./app.tsx";

const BrowserApp = () => (
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

const hydrate = () =>
  startTransition(() => {
    hydrateRoot(
      document.body,
      <StrictMode>
        <BrowserApp />
      </StrictMode>,
    );
  });

if (typeof requestIdleCallback !== "undefined") {
  requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  setTimeout(hydrate, 1);
}
