import { Page } from "@playwright/test";

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  static async init(page: Page) {
    return new HomePage(page);
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
    return this;
  }

  async clickOnLoginButton() {
    await this.page.locator("//a[text()='Sign in']").click();
    return this;
  }

  async getTitle() {
    const title = await this.page.title();
    return title;
  }
}
