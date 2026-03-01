import { defineConfig, devices } from '@playwright/test';

declare const process: { env: { CI?: string; BASE_URL?: string } };

export default defineConfig({
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html']],
  use: {
    baseURL:
      process.env.BASE_URL ?? 'https://marsair.recruiting.thoughtworks.net/WeiLianLow',
    trace: 'on-first-retry',
    // Site can return "Not authorized" when request doesn't look like a normal browser visit
    extraHTTPHeaders: {
      Referer: process.env.BASE_URL ?? 'https://marsair.recruiting.thoughtworks.net/WeiLianLow',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          // Required in sandboxed environments (Cursor sandbox, some CI) where OS sandbox isn't available
          chromiumSandbox: false,
        },
      },
    },
  ],
});
