import {
  installTwind,
  presetAutoprefix,
  presetTailwind,
} from "../deps_client.ts";
import { isBrowser, isProduction } from "../env.ts";

export const tw = installTwind({
  presets: [presetAutoprefix(), presetTailwind()],
}, isProduction());

if (isBrowser) console.log("tw", tw);
