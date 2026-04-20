// spec: specs/mars-air/flight-search/test_plan.md

import { test, expect } from '@playwright/test';

test.describe('Valid Search: No Seats Available', () => {
  test('Valid date range with no available seats displays correct message (boundary: 12 months gap)', async ({ page }) => {
    // 1. Navigate to the MarsAir home page
    await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');

    // 2. Select "July" from the "Departing" dropdown
    await page.getByLabel('Departing').selectOption(['July']);

    // 3. Select "July (next year)" from the "Returning" dropdown (12-month gap — minimum valid)
    await page.getByLabel('Returning').selectOption(['July (next year)']);

    // 4. Click the "Search" button
    await page.getByRole('button', { name: 'Search' }).click();

    // Verify page navigated to Search Results
    await expect(page).toHaveTitle('Mars Airlines: Search Results');

    // Verify no seats available message is displayed
    await expect(page.getByText('Sorry, there are no more seats available.')).toBeVisible();

    // Verify schedule-invalid message is NOT displayed
    await expect(page.getByText('Unfortunately, this schedule is not possible.')).not.toBeVisible();

    // Verify Back link is visible
    await expect(page.getByRole('link', { name: 'Back' })).toBeVisible();
  });
});
