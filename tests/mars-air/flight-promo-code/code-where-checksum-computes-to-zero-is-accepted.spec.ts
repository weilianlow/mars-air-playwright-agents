// spec: specs/mars-air/flight-promo-code/test_plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';
import { MarsAirPage } from '@pages/mars-air/WeiLianLow';

test.describe('Checksum Validation (AC3)', () => {
  test.fixme('Code where checksum computes to zero is accepted (AC3 edge case — BUG-2)', async ({ page }) => {
    const marsAirPage = new MarsAirPage(page);

    // 1. Navigate to the MarsAir home page
    await marsAirPage.goto();

    // 2. Select "July" from the "Departing" dropdown
    await marsAirPage.departingSelect.selectOption(['July']);

    // 3. Select "December (two years from now)" from the "Returning" dropdown
    await marsAirPage.returningSelect.selectOption(['December (two years from now)']);

    // 4. Enter "JJ5-OPQ-320" in the "Promotional Code" field (5+3+2=10, 10 mod 10=0, check digit=0)
    await marsAirPage.promoCodeInput.fill('JJ5-OPQ-320');

    // 5. Click the "Search" button
    await marsAirPage.searchButton.click();

    await expect(page.getByText('Seats available!')).toBeVisible();
    await expect(page.getByText('Promotional code JJ5-OPQ-320 used:')).toBeVisible();
    await expect(page.getByText('50% discount')).toBeVisible();
  });
});
