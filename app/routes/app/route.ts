import { useRouteError } from "@remix-run/react";
import type { HeadersArgs } from "@remix-run/server-runtime";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";
import { boundary } from "@shopify/shopify-app-remix";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export { loader } from "./loader";
export { App as default } from "./App";

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs: HeadersArgs) => {
  return boundary.headers(headersArgs);
};
