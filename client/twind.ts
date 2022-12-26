import {
  installTwind,
  presetAutoprefix,
  presetTailwind,
} from "../deps_client.ts";
import { isProduction } from "../env.ts";

export const tw = installTwind({
  presets: [presetAutoprefix(), presetTailwind()],
}, isProduction());
