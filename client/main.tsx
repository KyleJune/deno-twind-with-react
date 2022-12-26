// for the side effect of creating the global twind instance
import "./twind.ts";

import { startTransition, StrictMode } from "react";
import { HelmetProvider, hydrateRoot, reactRouter } from "../deps_client.ts";
import { App } from "./app.tsx";
const { BrowserRouter } = reactRouter;

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
