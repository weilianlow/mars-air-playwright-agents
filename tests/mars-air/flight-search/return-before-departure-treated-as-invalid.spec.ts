// spec: specs/mars-air/flight-search/test_plan.md
// Known Bug: Application displays "Sorry, there are no more seats available."
// instead of the schedule-invalid message when return date precedes departure date.

import { test, expect } from '@playwright/test';

test.describe('Invalid Date Combinations: Schedule Not Possible', () => {
  test.fixme('Return date before departure date is treated as invalid (EP: negative gap)', async ({ page }) => {
    // 1. Navigate to the MarsAir home page
    await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');

    // 2. Select "December" from the "Departing" dropdown
    await page.getByLabel('Departing').selectOption(['December']);

    // 3. Select "July" from the "Returning" dropdown (return is 5 months before departure)
    await page.getByLabel('Returning').selectOption(['July']);

    // 4. Click the "Search" button
    await page.getByRole('button', { name: 'Search' }).click();

    // Verify schedule-invalid message is displayed
    await expect(page.getByText('Unfortunately, this schedule is not possible. Please try again.')).toBeVisible();
  });
});
