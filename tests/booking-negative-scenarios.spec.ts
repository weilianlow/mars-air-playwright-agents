import { test, expect } from '@playwright/test';

test.describe('Booking Functionality - Negative Scenarios and Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');
  });

  test('Attempt to Book with Invalid Return Date', async ({ page }) => {
    await page.selectOption('select#departing', { label: 'December' });
    await page.selectOption('select#returning', { label: 'July' });
    await page.click('input[type="submit"]');

    await expect(page.locator('body')).toContainText('Sorry, there are no more seats available.');
  });

  test('Search with No Date Selection', async ({ page }) => {
    await page.click('input[type="submit"]');

    await expect(page.locator('body')).toContainText('Sorry, there are no more seats available.');
  });
});
