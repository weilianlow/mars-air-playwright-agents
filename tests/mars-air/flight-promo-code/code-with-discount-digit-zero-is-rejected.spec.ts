// spec: specs/mars-air/flight-promo-code/test_plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';
import { MarsAirPage } from '@pages/mars-air/WeiLianLow';

test.describe('Discount Digit Boundary (AC2)', () => {
  test.fixme('Code with discount digit zero is rejected (BVA: lower boundary — BUG-1)', async ({ page }) => {
    const marsAirPage = new MarsAirPage(page);

    // 1. Navigate to the MarsAir home page
    await marsAirPage.goto();

    // 2. Select "July" from the "Departing" dropdown
    await marsAirPage.departingSelect.selectOption(['July']);

    // 3. Select "December (two years from now)" from the "Returning" dropdown
    await marsAirPage.returningSelect.selectOption(['December (two years from now)']);

    // 4. Enter "AB0-CDE-000" in the "Promotional Code" field (discount digit=0, checksum=0+0+0=0)
    await marsAirPage.promoCodeInput.fill('AB0-CDE-000');

    // 5. Click the "Search" button
    await marsAirPage.searchButton.click();

    await expect(page.getByText('Sorry, code AB0-CDE-000 is not valid')).toBeVisible();
    await expect(page.getByText(/Promotional code .* used:/)).not.toBeVisible();
  });
});
