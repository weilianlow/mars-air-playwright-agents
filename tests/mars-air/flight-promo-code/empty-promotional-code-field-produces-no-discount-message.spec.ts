// spec: specs/mars-air/flight-promo-code/test_plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';
import { MarsAirPage } from '@pages/mars-air/WeiLianLow';

test.describe('Empty and Whitespace Inputs', () => {
  test('Empty promotional code field produces no discount message', async ({ page }) => {
    const marsAirPage = new MarsAirPage(page);

    // 1. Navigate to the MarsAir home page
    await marsAirPage.goto();

    // 2. Select "July" from the "Departing" dropdown
    await marsAirPage.departingSelect.selectOption(['July']);

    // 3. Select "December (two years from now)" from the "Returning" dropdown
    await marsAirPage.returningSelect.selectOption(['December (two years from now)']);

    // 4. Leave the "Promotional Code" field empty

    // 5. Click the "Search" button
    await marsAirPage.searchButton.click();

    await expect(page.getByText('Seats available!')).toBeVisible();
    await expect(page.getByText(/Promotional code .* used:/)).not.toBeVisible();
    await expect(page.getByText(/Sorry, code .* is not valid/)).not.toBeVisible();
    await expect(page.getByText('Call now on 0800 MARSAIR to book!')).toBeVisible();
  });
});
