// spec: specs/mars-air/flight-promo-code/test_plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Valid Promotional Code (AC1)', () => {
  test('Valid promo code applies the correct discount percentage', async ({ page }) => {
    // 1. Navigate to the MarsAir home page
    await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');

    // 2. Select "July" from the "Departing" dropdown
    await page.getByLabel('Departing').selectOption(['July']);

    // 3. Select "December (two years from now)" from the "Returning" dropdown
    await page.getByLabel('Returning').selectOption(['December (two years from now)']);

    // 4. Enter AF3-FJK-418 in the "Promotional Code" field
    await page.getByRole('textbox', { name: 'Promotional Code' }).fill('AF3-FJK-418');

    // 5. Click the "Search" button
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page).toHaveTitle('Mars Airlines: Search Results');
    await expect(page.getByText('Seats available!')).toBeVisible();
    await expect(page.getByText('Promotional code AF3-FJK-418 used:')).toBeVisible();
    await expect(page.getByText('30% discount', { exact: false })).toBeVisible();
    await expect(page.getByText('Call now on 0800 MARSAIR to book!')).toBeVisible();
    await expect(page.getByText('Sorry, code', { exact: false })).not.toBeVisible();
  });
});
