import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    headless: false,
    acceptDownloads: true,
    viewport: { width: 1920, height: 1080 },
    screenshot: "only-on-failure",
    trace:"retain-on-failure"
  },
  reporter: [["line"], ["experimental-allure-playwright"]],
  workers: 4,
  timeout: 30000,
};

export default config;
