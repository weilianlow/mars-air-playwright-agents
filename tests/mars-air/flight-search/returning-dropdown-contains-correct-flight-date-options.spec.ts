// spec: specs/mars-air/flight-search/test_plan.md

import { test, expect } from '@playwright/test';

test.describe('Search Form Structure', () => {
  test('Returning dropdown contains the correct flight date options', async ({ page }) => {
    // 1. Navigate to the MarsAir home page
    await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');

    // 2. Inspect the "Returning" dropdown
    const options = page.getByLabel('Returning').locator('option');

    // Verify exactly 7 items
    await expect(options).toHaveCount(7);

    // Verify options in correct order
    await expect(options.nth(0)).toHaveText('Select...');
    await expect(options.nth(1)).toHaveText('July');
    await expect(options.nth(2)).toHaveText('December');
    await expect(options.nth(3)).toHaveText('July (next year)');
    await expect(options.nth(4)).toHaveText('December (next year)');
    await expect(options.nth(5)).toHaveText('July (two years from now)');
    await expect(options.nth(6)).toHaveText('December (two years from now)');

    // Verify "Select..." is selected by default
    const selectedText = await page.getByLabel('Returning').evaluate(
      (el) => (el as HTMLSelectElement).options[(el as HTMLSelectElement).selectedIndex].text
    );
    expect(selectedText).toBe('Select...');
  });
});
