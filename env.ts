export const isServer = () => "Deno" in globalThis;
export const isBrowser = () => !isServer();

interface EnvironmentWindow extends Window {
  env?: {
    [key: string]: string;
  };
}
export const getEnv = (
  key: string,
) => (isServer() ? Deno.env.get(key) : (window as EnvironmentWindow).env?.[key]);
export const isProduction = () => getEnv("APP_ENV") === "production";
