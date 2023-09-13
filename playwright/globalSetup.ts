import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage({ ignoreHTTPSErrors: true });
  await page.goto(`${baseURL}/login?returnPath=%2Fstore%2Fshop1`);
  await page.locator('input[name="account[email]"]').nth(0).click();
  await page
    .locator('input[name="account[email]"]')
    .nth(0)
    .fill("dev@shopify.com");
  await page.locator('button:has-text("Continue with Email")').click();

  await page.locator('input[name="account\\[password\\]"]').nth(0).click();
  await page
    .locator('input[name="account\\[password\\]"]')
    .nth(0)
    .fill("password");
  await page.locator('button:has-text("Log in")').click();

  // this saves the state of the browser storage, saving us from logging in each test
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;
