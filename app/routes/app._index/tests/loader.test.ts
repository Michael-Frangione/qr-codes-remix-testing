import { describe, expect, it, vi } from "vitest";
import { testLoader } from "test/utils";
import qrCodes from "~/models/mocks/QRcode.json";
import { loader } from "../loader";

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

const getQRCodesMock = vi.hoisted(() => vi.fn());
getQRCodesMock.mockReturnValue(qrCodes);

vi.mock("~/models/QRCode.server", () => ({
  getQRCodes: getQRCodesMock,
}));

describe("/app._index route loader", () => {
  it("calls authenticate.admin", async () => {
    await testLoader(loader);

    expect(authenticateAdminMock).toHaveBeenCalledTimes(1);
  });

  it("returns qr codes", async () => {
    const data = await testLoader(loader);

    expect(data.qrCodes).toEqual(qrCodes);
  });
});
