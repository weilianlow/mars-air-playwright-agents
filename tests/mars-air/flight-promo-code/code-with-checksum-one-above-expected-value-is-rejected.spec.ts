// spec: specs/mars-air/flight-promo-code/test_plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Checksum Validation (AC3)', () => {
  test('Code with checksum one above the expected value is rejected (BVA: above boundary)', async ({ page }) => {
    // 1. Navigate to the MarsAir home page
    await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');

    // 2. Select "July" from the "Departing" dropdown
    await page.getByLabel('Departing').selectOption(['July']);

    // 3. Select "December (two years from now)" from the "Returning" dropdown
    await page.getByLabel('Returning').selectOption(['December (two years from now)']);

    // 4. Enter AF3-FJK-419 in the "Promotional Code" field (checksum digit 9, expected 8)
    await page.getByRole('textbox', { name: 'Promotional Code' }).fill('AF3-FJK-419');

    // 5. Click the "Search" button
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.getByText('Sorry, code AF3-FJK-419 is not valid')).toBeVisible();
    await expect(page.getByText('discount', { exact: false })).not.toBeVisible();
  });
});
