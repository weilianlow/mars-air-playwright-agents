// spec: specs/mars-air/flight-promo-code/test_plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';
import { MarsAirPage } from '@pages/mars-air/WeiLianLow';

test.describe('Valid Promotional Code (AC1)', () => {
  test('Valid promo code with different discount percentage (20%)', async ({ page }) => {
    const marsAirPage = new MarsAirPage(page);

    // 1. Navigate to the MarsAir home page
    await marsAirPage.goto();

    // 2. Select "July" from the "Departing" dropdown
    await marsAirPage.departingSelect.selectOption(['July']);

    // 3. Select "December (two years from now)" from the "Returning" dropdown
    await marsAirPage.returningSelect.selectOption(['December (two years from now)']);

    // 4. Enter "ZZ2-KLM-316" in the "Promotional Code" field
    await marsAirPage.promoCodeInput.fill('ZZ2-KLM-316');

    // 5. Click the "Search" button
    await marsAirPage.searchButton.click();

    await expect(page.getByText('Seats available!')).toBeVisible();
    await expect(page.getByText('Promotional code ZZ2-KLM-316 used:')).toBeVisible();
    await expect(page.getByText('20% discount')).toBeVisible();
  });
});
