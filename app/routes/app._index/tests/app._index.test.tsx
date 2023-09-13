import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { mountWithBrowserRouter } from "test/utils";
import qrCodes from "~/models/mocks/QRcode.json";
import { AppIndex } from "../AppIndex";

const useLoaderDataMock = vi.hoisted(() => vi.fn());
useLoaderDataMock.mockReturnValue({ qrCodes });

vi.mock("@remix-run/react", async (originalImport) => {
  const original: any = await originalImport();
  return {
    ...original,
    useLoaderData: useLoaderDataMock,
  };
});

describe("AppIndex", () => {
  it("renders a title", async () => {
    await mountWithBrowserRouter(<AppIndex />);

    expect(screen.getByTitle("QR codes")).toBeInTheDocument();
  });

  it("renders a create QR code button", async () => {
    await mountWithBrowserRouter(<AppIndex />);
    expect(
      screen.getByRole("button", { name: "Create QR code" })
    ).toBeInTheDocument();
  });

  describe("when productGroupings is empty", () => {
    it("renders an empty state card", async () => {
      useLoaderDataMock.mockReturnValueOnce({ qrCodes: [] });

      await mountWithBrowserRouter(<AppIndex />);

      expect(
        screen.getByText("Create unique QR codes for your product")
      ).toBeInTheDocument();
    });
  });

  describe("when productGroupings is not empty", () => {
    it("renders a QR code table", async () => {
      useLoaderDataMock.mockReturnValueOnce({ qrCodes });

      await mountWithBrowserRouter(<AppIndex />);

      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getAllByRole("row")).length(3); // 2 code rows + header
    });
  });
});
