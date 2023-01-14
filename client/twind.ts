import install from "$npm/@twind/with-react";
import presetTailwind from "$npm/@twind/preset-tailwind";
import presetAutoprefix from "$npm/@twind/preset-autoprefix";
import { isBrowser, isProduction } from "../env.ts";

export const tw = install({
  presets: [presetAutoprefix(), presetTailwind()],
}, isProduction());

if (!isProduction() && isBrowser()) {
  console.log("tw", tw);
}
