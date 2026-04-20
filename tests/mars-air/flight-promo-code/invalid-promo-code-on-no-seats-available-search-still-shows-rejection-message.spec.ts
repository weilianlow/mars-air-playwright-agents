// spec: specs/mars-air/flight-promo-code/test_plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Promo Code with No Seats Available', () => {
  test('Invalid promo code on a no-seats-available search still shows rejection message', async ({ page }) => {
    // 1. Navigate to the MarsAir home page
    await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');

    // 2. Select "July" from the "Departing" dropdown
    await page.getByLabel('Departing').selectOption(['July']);

    // 3. Select "July (next year)" from the "Returning" dropdown (12-month gap — no seats available)
    await page.getByLabel('Returning').selectOption(['July (next year)']);

    // 4. Enter AF3-FJK-419 in the "Promotional Code" field (wrong checksum)
    await page.getByRole('textbox', { name: 'Promotional Code' }).fill('AF3-FJK-419');

    // 5. Click the "Search" button
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.getByText('Sorry, there are no more seats available.')).toBeVisible();
    await expect(page.getByText('Sorry, code AF3-FJK-419 is not valid')).toBeVisible();
  });
});
