import { describe, expect, it, vi } from "vitest";
import { testLoader } from "test/utils";
import { loader } from "../loader";

const authenticateAdminMock = vi.hoisted(() => vi.fn());
authenticateAdminMock.mockReturnValue({
  admin: {},
  session: { shop: "test.myshopify.com" },
});

vi.mock("~/shopify.server", async (originalImport) => {
  const original: any = await originalImport;
  return {
    ...original,
    authenticate: {
      ...original.authenticate,
      admin: authenticateAdminMock,
    },
  };
});

describe("/app route loader", () => {
  it("calls authenticate.admin", async () => {
    await testLoader(loader);

    expect(authenticateAdminMock).toHaveBeenCalledTimes(1);
  });

  it("returns the expected apiKey", async () => {
    const expectedApiKey = "12345";
    vi.stubEnv("SHOPIFY_API_KEY", expectedApiKey);

    const data = await testLoader(loader);

    expect(data).toEqual({ apiKey: expectedApiKey });
  });
});
