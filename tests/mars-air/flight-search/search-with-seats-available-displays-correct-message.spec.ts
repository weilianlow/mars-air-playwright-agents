// spec: specs/mars-air/flight-search/test_plan.md

import { test, expect } from '@playwright/test';

test.describe('Valid Search: Seats Available', () => {
  test('Search with seats available displays correct availability message', async ({ page }) => {
    // 1. Navigate to the MarsAir home page
    await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');

    // 2. Select "July" from the "Departing" dropdown
    await page.getByLabel('Departing').selectOption(['July']);

    // 3. Select "December (two years from now)" from the "Returning" dropdown
    await page.getByLabel('Returning').selectOption(['December (two years from now)']);

    // 4. Click the "Search" button
    await page.getByRole('button', { name: 'Search' }).click();

    // Verify page navigated to Search Results
    await expect(page).toHaveTitle('Mars Airlines: Search Results');

    // Verify seats available message is displayed
    await expect(page.getByText('Seats available!')).toBeVisible();

    // Verify booking call-to-action is displayed
    await expect(page.getByText('Call now on 0800 MARSAIR to book!')).toBeVisible();

    // Verify Back link is visible
    await expect(page.getByRole('link', { name: 'Back' })).toBeVisible();
  });
});
