import { describe, expect, it, vi } from "vitest";
import { redirect } from "@remix-run/node";
import { testAction, createFormData } from "test/utils";
import { action } from "../action";

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

// const dbMock = vi.hoisted(() => vi.fn());
// dbMock.mockReturnValue({
//   qrCode: {
//     delete: vi.fn(),
//   },
// });

// vi.mock("../../../db.server", async (originalImport) => {
//   const original: any = await originalImport();
//   return {
//     ...original,
//     db: {
//       ...original.db,
//       qrCode: dbMock,
//     },
//   };
// });

describe("/app._index route loader", () => {
  it("runs delete action and redirects", async () => {
    const formData = new FormData();
    formData.append("action", "delete");

    const response = await testAction(action, {
      params: {}, // TODO: how to mock a id db delete call with spy??
      request: new Request("http://localhost", {
        method: "POST",
        body: formData,
      }),
      context: {},
    });

    expect(response).toEqual(redirect("/app"));
  });

  describe("create and update", () => {
    const mockFormData = {
      title: "dfsdfsdf",
      productId: "gid://shopify/Product/8584300101953",
      productVariantId: "gid://shopify/ProductVariant/46403510796609",
      productHandle: "the-hidden-snowboard",
      destination: "product",
    };

    const formData = createFormData(mockFormData);

    it("runs create action and redirect to qrcode page", async () => {
      const response = await testAction(action, {
        params: { id: "new" }, // TODO: how to mock a id db create call with spy?
        request: new Request("http://localhost", {
          method: "POST",
          body: formData,
        }),
        context: {},
      });

      expect(response).toContain(redirect("/app/qrcodes/"));
    });

    it("runs update action and redirects to qrcode page", async () => {
      const response = await testAction(action, {
        params: { id: "10" }, // TODO: how to mock a id db update call with spy?
        request: new Request("http://localhost", {
          method: "POST",
          body: formData,
        }),
        context: {},
      });

      expect(response).toEqual(redirect("/app/qrcodes/10"));
    });
  });
});
