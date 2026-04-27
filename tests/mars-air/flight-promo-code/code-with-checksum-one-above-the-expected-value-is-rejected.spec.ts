// spec: specs/mars-air/flight-promo-code/test_plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';
import { MarsAirPage } from '@pages/mars-air/WeiLianLow';

test.describe('Checksum Validation (AC3)', () => {
  test('Code with checksum one above the expected value is rejected (BVA: above boundary)', async ({ page }) => {
    const marsAirPage = new MarsAirPage(page);

    // 1. Navigate to the MarsAir home page
    await marsAirPage.goto();

    // 2. Select "July" from the "Departing" dropdown
    await marsAirPage.departingSelect.selectOption(['July']);

    // 3. Select "December (two years from now)" from the "Returning" dropdown
    await marsAirPage.returningSelect.selectOption(['December (two years from now)']);

    // 4. Enter "AF3-FJK-419" in the "Promotional Code" field (expected checksum=8, code has 9)
    await marsAirPage.promoCodeInput.fill('AF3-FJK-419');

    // 5. Click the "Search" button
    await marsAirPage.searchButton.click();

    await expect(page.getByText('Sorry, code AF3-FJK-419 is not valid')).toBeVisible();
    await expect(page.getByText(/Promotional code .* used:/)).not.toBeVisible();
  });
});
