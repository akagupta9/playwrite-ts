import { Page } from "@playwright/test";

export class HomePage {
  private page: Page;

  private selectors = {
    signInButton: "//a[text()='Sign in']",
    usernameField: "#username",
    passwordField: "#password",
    loginSubmitButton: "button[type='submit']",
  };

  constructor(page: Page) {
    this.page = page;
  }

  static async init(page: Page) {
    return new HomePage(page);
  }

  async getTitle() {
    const title = await this.page.title();
    return title;
  }

  async doLogin(email: string, password: string) {
    await this.page.locator(this.selectors.signInButton).click();
    await this.page.locator(this.selectors.usernameField).fill(email);
    await this.page.locator(this.selectors.passwordField).fill(password);
    await this.page.locator(this.selectors.loginSubmitButton).click();
    await this.page.pause();
    return this;
  }
}
