import { test, expect } from '@playwright/test';

test.describe('Landing Page and Basic UI', () => {
  test('Verify Landing Page Content', async ({ page }) => {
    await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');

    await expect(page.locator('h1 a')).toHaveText('MarsAir');
    await expect(page.locator('h2')).toHaveText('Welcome to MarsAir!');
    await expect(page.locator('h3')).toHaveText('Book a ticket to the red planet now!');
    await expect(page.locator('label[for="departing"]')).toBeVisible();
    await expect(page.locator('label[for="returning"]')).toBeVisible();
    await expect(page.locator('label[for="promotional_code"]')).toBeVisible();
    await expect(page.locator('input[type="submit"]')).toBeVisible();
  });
});
