// spec: specs/mars-air/flight-search/test_plan.md

import { test, expect } from '@playwright/test';

test.describe('Invalid Date Combinations: Schedule Not Possible', () => {
  test('Return date 7 months after departure shows schedule-invalid message (BVA: just below 12-month boundary)', async ({ page }) => {
    // 1. Navigate to the MarsAir home page
    await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');

    // 2. Select "December" from the "Departing" dropdown
    await page.getByLabel('Departing').selectOption(['December']);

    // 3. Select "July (next year)" from the "Returning" dropdown (7-month gap)
    await page.getByLabel('Returning').selectOption(['July (next year)']);

    // 4. Click the "Search" button
    await page.getByRole('button', { name: 'Search' }).click();

    // Verify schedule-invalid message is displayed
    await expect(page.getByText('Unfortunately, this schedule is not possible. Please try again.')).toBeVisible();

    // Verify no seat availability message is shown
    await expect(page.getByText('Seats available!')).not.toBeVisible();
    await expect(page.getByText('Sorry, there are no more seats available.')).not.toBeVisible();
  });
});
