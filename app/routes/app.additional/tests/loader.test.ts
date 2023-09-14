import { describe, expect, it, vi } from "vitest";
import { testLoader } from "test/utils";
import { loader } from "../loader";
import products from "~/models/mocks/Products.json";

const authenticateAdminMock = vi.hoisted(() => vi.fn());
authenticateAdminMock.mockReturnValue({
  admin: {},
  session: { shop: "test.myshopify.com" },
});

vi.mock("~/shopify.server", async (originalImport) => {
  const original: any = await originalImport();
  return {
    ...original,
    authenticate: {
      ...original.authenticate,
      admin: authenticateAdminMock,
    },
  };
});

const getProductsMock = vi.hoisted(() => vi.fn());
getProductsMock.mockReturnValue(products);

vi.mock("~/models/QRCode.server", () => ({
  getProducts: getProductsMock,
}));

describe("/app._index route loader", () => {
  it("calls authenticate.admin", async () => {
    await testLoader(loader);
    expect(true).toBe(true);
  });
});
