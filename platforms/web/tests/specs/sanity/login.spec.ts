import { expect, test } from "@playwright/test";

test.describe("HOME : UI Verification", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.linkedin.com/");
  });

  test("should verify the Title", async ({ page }) => {
    const title = await page.title();
    await expect(title).toContain("LinkedIn");
  });

  test("should verify presence of Home Tab", async ({ page }) => {
    const isHomeTabPresent = await (await page
      .locator("//span[text()='Home']"))
      .isVisible({ timeout: 5000 });
    await expect(isHomeTabPresent).toBeTruthy();
  });
});
