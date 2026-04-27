// spec: specs/mars-air/flight-promo-code/test_plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';
import { MarsAirPage } from '@pages/mars-air/WeiLianLow';

test.describe('Promo Code with No Seats Available', () => {
  test.fixme('Invalid promo code on a no-seats-available search still shows rejection message', async ({ page }) => {
    const marsAirPage = new MarsAirPage(page);

    // 1. Navigate to the MarsAir home page
    await marsAirPage.goto();

    // 2. Select "July" from the "Departing" dropdown
    await marsAirPage.departingSelect.selectOption(['July']);

    // 3. Select "July (next year)" from the "Returning" dropdown (12-month gap — no seats available)
    await marsAirPage.returningSelect.selectOption(['July (next year)']);

    // 4. Enter "AF3-FJK-419" in the "Promotional Code" field (wrong checksum)
    await marsAirPage.promoCodeInput.fill('AF3-FJK-419');

    // 5. Click the "Search" button
    await marsAirPage.searchButton.click();

    await expect(page.getByText('Sorry, there are no more seats available.')).toBeVisible();
    await expect(page.getByText('Sorry, code AF3-FJK-419 is not valid')).toBeVisible();
  });
});
