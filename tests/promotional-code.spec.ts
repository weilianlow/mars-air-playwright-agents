import { test, expect } from '@playwright/test';

test.describe('Promotional Code Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');
  });

  test('Apply a Valid Promotional Code', async ({ page }) => {
    await page.selectOption('select#departing', { label: 'July' });
    await page.selectOption('select#returning', { label: 'July (next year)' });
    await page.getByLabel('Promotional Code').fill('AF12-3456');
    await page.click('input[type="submit"]');

    await expect(page.locator('body')).toContainText('Sorry, there are no more seats available.');
  });

  test('Apply an Invalid Promotional Code', async ({ page }) => {
    await page.selectOption('select#departing', { label: 'July' });
    await page.selectOption('select#returning', { label: 'July (next year)' });
    await page.getByLabel('Promotional Code').fill('INVALIDC');
    await page.click('input[type="submit"]');

    await expect(page.locator('body')).toContainText('Sorry, there are no more seats available.');
  });

  test('Apply a Promotional Code with incorrect format', async ({ page }) => {
    await page.selectOption('select#departing', { label: 'July' });
    await page.selectOption('select#returning', { label: 'July (next year)' });
    await page.getByLabel('Promotional Code').fill('ABC-123');
    await page.click('input[type="submit"]');

    await expect(page.locator('body')).toContainText('Sorry, there are no more seats available.');
  });
});
