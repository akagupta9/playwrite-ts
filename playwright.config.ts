import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    headless: false,
    acceptDownloads: true,
    viewport: { width: 1920, height: 1080 },
  },
  reporter: "experimental-allure-playwright",
};

export default config;
