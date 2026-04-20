// spec: specs/mars-air/flight-search/test_plan.md
// Known Bug: Application submits and displays "Sorry, there are no more seats available."
// without validating that a return date was chosen.

import { test, expect } from '@playwright/test';

test.describe('Incomplete Form Submission', () => {
  test.fixme('Submitting search with departure selected but no return date', async ({ page }) => {
    // 1. Navigate to the MarsAir home page
    await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');

    // 2. Select "July" from the "Departing" dropdown
    await page.getByLabel('Departing').selectOption(['July']);

    // 3. Leave the "Returning" dropdown at the default "Select..." placeholder

    // 4. Click the "Search" button
    await page.getByRole('button', { name: 'Search' }).click();

    // Verify a validation error is displayed prompting the user to select a return date
    await expect(page).not.toHaveTitle('Mars Airlines: Search Results');
    await expect(page.getByText(/select/i)).toBeVisible();
  });
});
