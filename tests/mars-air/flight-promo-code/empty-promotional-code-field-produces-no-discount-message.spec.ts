// spec: specs/mars-air/flight-promo-code/test_plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Empty and Whitespace Inputs', () => {
  test('Empty promotional code field produces no discount message', async ({ page }) => {
    // 1. Navigate to the MarsAir home page
    await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');

    // 2. Select "July" from the "Departing" dropdown
    await page.getByLabel('Departing').selectOption(['July']);

    // 3. Select "December (two years from now)" from the "Returning" dropdown
    await page.getByLabel('Returning').selectOption(['December (two years from now)']);

    // 4. Leave the "Promotional Code" field empty
    await page.getByRole('textbox', { name: 'Promotional Code' }).fill('');

    // 5. Click the "Search" button
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.getByText('Seats available!')).toBeVisible();
    await expect(page.getByText('Promotional code', { exact: false })).not.toBeVisible();
    await expect(page.getByText('Sorry, code', { exact: false })).not.toBeVisible();
    await expect(page.getByText('Call now on 0800 MARSAIR to book!')).toBeVisible();
  });
});
