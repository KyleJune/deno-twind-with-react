import install from "$esm/@twind/with-react";
import presetTailwind from "$esm/@twind/preset-tailwind";
import presetAutoprefix from "$esm/@twind/preset-autoprefix";
import { isBrowser, isProduction } from "../env.ts";

export const tw = install({
  presets: [presetAutoprefix(), presetTailwind()],
}, isProduction());

if (!isProduction() && isBrowser()) {
  console.log("tw", tw);
}
