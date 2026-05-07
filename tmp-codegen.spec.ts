import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');
});