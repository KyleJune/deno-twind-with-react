// for the side effect of creating the global twind instance
import "./twind.ts";

import { startTransition, StrictMode } from "$esm/react";
import { HelmetProvider } from "$esm/react-helmet-async";
import { hydrateRoot } from "$esm/react-dom/client";
import { BrowserRouter } from "$esm/react-router-dom";
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

if (requestIdleCallback) {
  requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  setTimeout(hydrate, 1);
}
