// spec: specs/mars-air/flight-promo-code/test_plan.md
// seed: seed.spec.ts

// BUG-1: The application incorrectly accepts codes with discount digit 0.
// Expected: code is rejected as invalid.
// Actual: "Promotional code AB0-CDE-000 used: 00% discount!" is displayed.

import { test, expect } from '@playwright/test';

test.describe('Discount Digit Boundary (AC2)', () => {
  test('Code with discount digit zero is rejected (BVA: lower boundary — BUG-1)', async ({ page }) => {
    // 1. Navigate to the MarsAir home page
    await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');

    // 2. Select "July" from the "Departing" dropdown
    await page.getByLabel('Departing').selectOption(['July']);

    // 3. Select "December (two years from now)" from the "Returning" dropdown
    await page.getByLabel('Returning').selectOption(['December (two years from now)']);

    // 4. Enter AB0-CDE-000 in the "Promotional Code" field (discount digit = 0, checksum 0+0+0=0 ✓)
    await page.getByRole('textbox', { name: 'Promotional Code' }).fill('AB0-CDE-000');

    // 5. Click the "Search" button
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.getByText('Sorry, code AB0-CDE-000 is not valid')).toBeVisible();
    await expect(page.getByText('discount', { exact: false })).not.toBeVisible();
  });
});
