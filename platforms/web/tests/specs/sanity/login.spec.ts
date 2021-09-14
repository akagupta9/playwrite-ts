import { expect, Page, test } from "@playwright/test";
import { HomePage } from "../../pages/home.page";

const proxymise = require("proxymise");

test.describe("HOME : UI Verification", () => {
  let page: Page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("https://www.linkedin.com/");
  });

  test("should verify the Title", async () => {
    const title = await page.title();
    await expect(title).toContain("LinkedIn");
  });

  test("should verify presence of Home Tab", async () => {
    const isHomeTabPresent = await (
      await page.locator("//span[text()='Home']")
    ).isVisible({ timeout: 5000 });
    await expect(isHomeTabPresent).toBeTruthy();
  });

  // Async Chaining
  test("should check the chaining of methods", async () => {
    const title = await proxymise(HomePage)
      .init(page)
      .navigateTo("https://www.linkedin.com/")
      .clickOnLoginButton()
      .getTitle();

    console.log(title);
  });
});
