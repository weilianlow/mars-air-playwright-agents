// spec: specs/mars-air/flight-promo-code/test_plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';
import { MarsAirPage } from '@pages/mars-air/WeiLianLow';

test.describe('Discount Digit Boundary (AC2)', () => {
  test('Code with discount digit one is accepted (BVA: just above lower boundary)', async ({ page }) => {
    const marsAirPage = new MarsAirPage(page);

    // 1. Navigate to the MarsAir home page
    await marsAirPage.goto();

    // 2. Select "July" from the "Departing" dropdown
    await marsAirPage.departingSelect.selectOption(['July']);

    // 3. Select "December (two years from now)" from the "Returning" dropdown
    await marsAirPage.returningSelect.selectOption(['December (two years from now)']);

    // 4. Enter "AB1-CDE-001" in the "Promotional Code" field (discount digit=1, checksum=1+0+0=1)
    await marsAirPage.promoCodeInput.fill('AB1-CDE-001');

    // 5. Click the "Search" button
    await marsAirPage.searchButton.click();

    await expect(page.getByText('Seats available!')).toBeVisible();
    await expect(page.getByText('Promotional code AB1-CDE-001 used:')).toBeVisible();
    await expect(page.getByText('10% discount')).toBeVisible();
  });
});
