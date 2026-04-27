// spec: specs/mars-air/flight-promo-code/test_plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';
import { MarsAirPage } from '@pages/mars-air/WeiLianLow';

test.describe('Invalid Promotional Code Format (AC2)', () => {
  test.fixme('Code with numeric characters in alpha positions is rejected (EP: type mismatch)', async ({ page }) => {
    const marsAirPage = new MarsAirPage(page);

    // 1. Navigate to the MarsAir home page
    await marsAirPage.goto();

    // 2. Select "July" from the "Departing" dropdown
    await marsAirPage.departingSelect.selectOption(['July']);

    // 3. Select "December (two years from now)" from the "Returning" dropdown
    await marsAirPage.returningSelect.selectOption(['December (two years from now)']);

    // 4. Enter "993-FJK-418" in the "Promotional Code" field (digits in positions 0-1 that should be alpha)
    await marsAirPage.promoCodeInput.fill('993-FJK-418');

    // 5. Click the "Search" button
    await marsAirPage.searchButton.click();

    await expect(page.getByText('Sorry, code 993-FJK-418 is not valid')).toBeVisible();
    await expect(page.getByText(/Promotional code .* used:/)).not.toBeVisible();
  });
});
