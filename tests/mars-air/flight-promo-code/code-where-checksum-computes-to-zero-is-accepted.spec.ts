// spec: specs/mars-air/flight-promo-code/test_plan.md
// seed: seed.spec.ts

// BUG-2: The application incorrectly rejects codes where the checksum digit sum is a multiple of 10.
// Expected: code is accepted and shows 50% discount.
// Actual: "Sorry, code JJ5-OPQ-320 is not valid" is displayed.

import { test, expect } from '@playwright/test';

test.describe('Checksum Validation (AC3)', () => {
  test('Code where checksum computes to zero is accepted (AC3 edge case — BUG-2)', async ({ page }) => {
    // 1. Navigate to the MarsAir home page
    await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');

    // 2. Select "July" from the "Departing" dropdown
    await page.getByLabel('Departing').selectOption(['July']);

    // 3. Select "December (two years from now)" from the "Returning" dropdown
    await page.getByLabel('Returning').selectOption(['December (two years from now)']);

    // 4. Enter JJ5-OPQ-320 in the "Promotional Code" field (5+3+2=10, mod 10 = 0 ✓)
    await page.getByRole('textbox', { name: 'Promotional Code' }).fill('JJ5-OPQ-320');

    // 5. Click the "Search" button
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.getByText('Seats available!')).toBeVisible();
    await expect(page.getByText('Promotional code JJ5-OPQ-320 used:')).toBeVisible();
    await expect(page.getByText('50% discount', { exact: false })).toBeVisible();
  });
});
