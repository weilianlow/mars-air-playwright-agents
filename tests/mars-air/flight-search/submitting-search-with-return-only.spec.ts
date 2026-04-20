// spec: specs/mars-air/flight-search/test_plan.md
// Known Bug: Application submits and displays "Sorry, there are no more seats available."
// without validating that a departure date was chosen.

import { test, expect } from '@playwright/test';

test.describe('Incomplete Form Submission', () => {
  test.fixme('Submitting search with return selected but no departure date', async ({ page }) => {
    // 1. Navigate to the MarsAir home page
    await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');

    // 2. Leave the "Departing" dropdown at the default "Select..." placeholder

    // 3. Select "December (two years from now)" from the "Returning" dropdown
    await page.getByLabel('Returning').selectOption(['December (two years from now)']);

    // 4. Click the "Search" button
    await page.getByRole('button', { name: 'Search' }).click();

    // Verify a validation error is displayed prompting the user to select a departure date
    await expect(page).not.toHaveTitle('Mars Airlines: Search Results');
    await expect(page.getByText(/select/i)).toBeVisible();
  });
});
