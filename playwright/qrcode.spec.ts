import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto(
    "https://quickstart-0af585fe.myshopify.com/admin/oauth/redirect_from_cli?client_id=69fadcd9222514a652665c261a117e25"
  );

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/QR Codes/);
});
