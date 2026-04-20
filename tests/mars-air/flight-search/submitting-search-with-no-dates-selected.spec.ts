// spec: specs/mars-air/flight-search/test_plan.md
// Known Bug: Application accepts empty form, navigates to Search Results and displays
// "Seats available! Call now on 0800 MARSAIR to book!" instead of a validation error.

import { test, expect } from '@playwright/test';

test.describe('Incomplete Form Submission', () => {
  test.fixme('Submitting search with no dates selected', async ({ page }) => {
    // 1. Navigate to the MarsAir home page
    await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');

    // 2. Leave both the "Departing" and "Returning" dropdowns at the default "Select..." placeholder

    // 3. Click the "Search" button
    await page.getByRole('button', { name: 'Search' }).click();

    // Verify form does not navigate to Search Results
    await expect(page).not.toHaveTitle('Mars Airlines: Search Results');

    // Verify a validation error is displayed prompting the user to select both dates
    await expect(page.getByText(/select/i)).toBeVisible();
  });
});
