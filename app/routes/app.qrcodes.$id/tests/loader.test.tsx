import { describe, expect, it, vi } from "vitest";
import { testLoader } from "test/utils";
import qrCodes from "~/models/mocks/QRcode.json";
import { loader } from "../loader";

const authenticateAdminMock = vi.hoisted(() => vi.fn());
authenticateAdminMock.mockReturnValue({
  admin: {},
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

const getQRCodeMock = vi.hoisted(() => vi.fn());
getQRCodeMock.mockReturnValue(qrCodes[0]);

vi.mock("~/models/QRCode.server", () => ({
  getQRCode: getQRCodeMock,
}));

describe("QRCodeForm route loader", () => {
  it("calls authenticate.admin", async () => {
    await testLoader(loader);

    expect(authenticateAdminMock).toHaveBeenCalledTimes(1);
  });

  it("return a new qr code", async () => {
    const data = await testLoader(loader, {
      params: { id: "new" },
      request: new Request("http://localhost"),
      context: {},
    });
    expect(data).toEqual({
      destination: "product",
      title: "",
    });
  });

  it("return a new qr code", async () => {
    const data = await testLoader(loader);
    expect(data).toEqual(qrCodes[0]);
  });
});
