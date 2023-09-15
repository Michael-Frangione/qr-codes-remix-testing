import { type ReactElement } from "react";
import { PolarisTestProvider } from "@shopify/polaris";
import { render } from "@testing-library/react";
import { unstable_createRemixStub } from "@remix-run/testing";
import type {
  ActionFunction,
  DataFunctionArgs,
  LoaderFunction,
} from "@remix-run/node";

const APP_URL = process.env.SHOPIFY_APP_URL || "http://localhost";

const AppContext = ({ children }: { children: ReactElement }) => (
  <PolarisTestProvider>{children}</PolarisTestProvider>
);

export const mountWithAppContext = (element: ReactElement) =>
  render(<AppContext>{element}</AppContext>);

export const mountWithBrowserRouter = (
  element: ReactElement = <div />,
  options?: any
) => {
  const RemixStub = unstable_createRemixStub([
    {
      path: "/",
      Component: () => element,
      ...options,
    },
  ]);

  return mountWithAppContext(<RemixStub />);
};

export const testLoader = async (
  loader: LoaderFunction,
  options?: DataFunctionArgs
) => {
  const response = await loader({
    request: new Request(APP_URL),
    context: {},
    params: {},
    ...options,
  });

  return await response.json();
};

export const testAction = async (
  action: ActionFunction,
  options?: DataFunctionArgs
) => {
  const response = await action({
    request: new Request(APP_URL),
    context: {},
    params: {},
    ...options,
  });

  return await response;
};


export const createFormData = (object) =>
  Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());
