import { test, expect } from '@playwright/test';

test.describe('Booking Functionality - Supposedly "Happy" Paths', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');
  });

  test('Attempt to book a return trip from July to December', async ({ page }) => {
    await page.selectOption('select#departing', { label: 'July' });
    await page.selectOption('select#returning', { label: 'December' });
    await page.click('input[type="submit"]');

    await expect(page.locator('body')).toContainText('Unfortunately, this schedule is not possible. Please try again.');
  });

  test('Book a Valid One-Way Trip', async ({ page }) => {
    await page.selectOption('select#departing', { label: 'July' });
    await page.selectOption('select#returning', { label: 'Select...' });
    await page.click('input[type="submit"]');

    await expect(page.locator('body')).toContainText('Sorry, there are no more seats available.');
  });

  test('Book a Trip with Same Month Departure and Return', async ({ page }) => {
    await page.selectOption('select#departing', { label: 'July' });
    await page.selectOption('select#returning', { label: 'July' });
    await page.click('input[type="submit"]');

    await expect(page.locator('body')).toContainText('Sorry, there are no more seats available.');
  });
});
