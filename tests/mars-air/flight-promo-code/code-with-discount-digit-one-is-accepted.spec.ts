// spec: specs/mars-air/flight-promo-code/test_plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Discount Digit Boundary (AC2)', () => {
  test('Code with discount digit one is accepted (BVA: just above lower boundary)', async ({ page }) => {
    // 1. Navigate to the MarsAir home page
    await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');

    // 2. Select "July" from the "Departing" dropdown
    await page.getByLabel('Departing').selectOption(['July']);

    // 3. Select "December (two years from now)" from the "Returning" dropdown
    await page.getByLabel('Returning').selectOption(['December (two years from now)']);

    // 4. Enter AB1-CDE-001 in the "Promotional Code" field (discount digit = 1, 1+0+0=1 ✓ → 10% discount)
    await page.getByRole('textbox', { name: 'Promotional Code' }).fill('AB1-CDE-001');

    // 5. Click the "Search" button
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.getByText('Seats available!')).toBeVisible();
    await expect(page.getByText('Promotional code AB1-CDE-001 used:')).toBeVisible();
    await expect(page.getByText('10% discount', { exact: false })).toBeVisible();
  });
});
