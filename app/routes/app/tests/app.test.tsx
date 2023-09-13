import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { mountWithBrowserRouter } from "test/utils";
import { App } from "../App";

const useLoaderDataMock = vi.hoisted(() => vi.fn());
useLoaderDataMock.mockReturnValue({ apiKey: "12345" });

vi.mock("@remix-run/react", async (originalImport) => {
  const original: any = await originalImport();
  return {
    ...original,
    useLoaderData: useLoaderDataMock,
  };
});

describe("component", () => {
  it("renders a link to the home page", async () => {
    await mountWithBrowserRouter(<App />);

    const link = screen.getByRole("link", { name: "Home" });
    expect(link).toHaveAttribute("href", "/app");
    expect(link).toHaveAttribute("rel", "home");
  });

  it("renders a link to documentation", async () => {
    await mountWithBrowserRouter(<App />);

    const link = screen.getByRole("link", {
      name: "Additional page",
    });
    expect(link).toHaveAttribute("href", "/app/additional");
  });
});
