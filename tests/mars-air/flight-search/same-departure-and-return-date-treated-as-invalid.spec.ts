// spec: specs/mars-air/flight-search/test_plan.md
// Known Bug: Application displays "Sorry, there are no more seats available."
// instead of the schedule-invalid message when departure and return are the same date.

import { test, expect } from '@playwright/test';

test.describe('Invalid Date Combinations: Schedule Not Possible', () => {
  test.fixme('Return date same as departure date is treated as invalid (EP: zero-gap boundary)', async ({ page }) => {
    // 1. Navigate to the MarsAir home page
    await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');

    // 2. Select "July (next year)" from the "Departing" dropdown
    await page.getByLabel('Departing').selectOption(['July (next year)']);

    // 3. Select "July (next year)" from the "Returning" dropdown (0-month gap)
    await page.getByLabel('Returning').selectOption(['July (next year)']);

    // 4. Click the "Search" button
    await page.getByRole('button', { name: 'Search' }).click();

    // Verify schedule-invalid message is displayed
    await expect(page.getByText('Unfortunately, this schedule is not possible. Please try again.')).toBeVisible();
  });
});
