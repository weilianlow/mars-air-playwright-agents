// spec: specs/mars-air/flight-search/test_plan.md

import { test, expect } from '@playwright/test';

test.describe('Valid Search: No Seats Available', () => {
  test('Valid date range with no seats displays correct message (17-month gap)', async ({ page }) => {
    // 1. Navigate to the MarsAir home page
    await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');

    // 2. Select "July" from the "Departing" dropdown
    await page.getByLabel('Departing').selectOption(['July']);

    // 3. Select "December (next year)" from the "Returning" dropdown (17-month gap)
    await page.getByLabel('Returning').selectOption(['December (next year)']);

    // 4. Click the "Search" button
    await page.getByRole('button', { name: 'Search' }).click();

    // Verify no seats available message is displayed
    await expect(page.getByText('Sorry, there are no more seats available.')).toBeVisible();

    // Verify schedule-invalid message is NOT displayed
    await expect(page.getByText('Unfortunately, this schedule is not possible.')).not.toBeVisible();

    // Verify Back link is visible
    await expect(page.getByRole('link', { name: 'Back' })).toBeVisible();
  });
});
