// spec: specs/mars-air/flight-search/test_plan.md

import { test, expect } from '@playwright/test';

test.describe('Search Results Page Navigation', () => {
  test('MarsAir logo on the Search Results page navigates back to the home page', async ({ page }) => {
    // 1. Navigate to the MarsAir home page
    await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');

    // 2. Select "July" from the "Departing" dropdown
    await page.getByLabel('Departing').selectOption(['July']);

    // 3. Select "December (two years from now)" from the "Returning" dropdown
    await page.getByLabel('Returning').selectOption(['December (two years from now)']);

    // 4. Click the "Search" button
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page).toHaveTitle('Mars Airlines: Search Results');

    // 5. On the Search Results page, click the "MarsAir" logo/heading in the top-left corner
    await page.getByRole('link', { name: 'MarsAir' }).click();

    // Verify the user is navigated to the home page at /WeiLianLow
    await expect(page).toHaveURL(/\/WeiLianLow/);

    // Verify the search form is displayed
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
  });
});
