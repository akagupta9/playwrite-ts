import { expect, Page, test } from "@playwright/test";
import { HomePage } from "../../pages/home.page";

const proxymise = require("proxymise");

test.describe("HOME : UI Verification", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("https://www.linkedin.com/");
  });

  test("should check the chaining of methods", async () => {
    const title = await proxymise(HomePage)
      .init(page)
      .clickOnLoginButton()
      .getTitle();
    expect(title).toContain("Sign in | LinkedIn");
  });

  test("should do login", async () => {
    await proxymise(HomePage).init(page).doLogin("", "");
  });
});
