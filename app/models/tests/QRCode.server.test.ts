import { describe, expect, it, vi } from "vitest";
import {
  validateQRCode,
  getQRCodeImage,
  getDestinationUrl,
  getQRCode,
} from "../QRCode.server";

describe("QR Code Server", () => {
  describe("getQRCodeImage", () => {
    it("should return a QR code image", async () => {
      const qrCodeImage = await getQRCodeImage("1");

      expect(qrCodeImage).toContain("data:image/png;base64,");
    });
  });

  describe("getDestinationUrl", () => {
    it("should return a URL with the the product url if the destination is product", () => {
      const qrCode = {
        shop: "example.myshopify.com",
        productHandle: "test",
        destination: "product",
      };

      const destinationUrl = getDestinationUrl(qrCode);

      expect(destinationUrl).toBe(
        "https://example.myshopify.com/products/test"
      );
    });

    it("should return a URL with the the product variant ID if the destination is cart", () => {
      const qrCode = {
        shop: "example.myshopify.com",
        productVariantId: "gid://shopify/ProductVariant/123",
        destination: "cart",
      };

      const destinationUrl = getDestinationUrl(qrCode);

      expect(destinationUrl).toBe("https://example.myshopify.com/cart/123:1");
    });
  });

  describe("validateQRCode", () => {
    it("should return an errors if missing fields", () => {
      const errors = validateQRCode({});

      expect(errors).toEqual({
        title: "Title is required",
        destination: "Destination is required",
        productId: "Product is required",
      });
    });
  });
});
