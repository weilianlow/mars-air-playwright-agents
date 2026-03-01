import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('Verify "Back" Button Functionality and State Persistence', async ({ page }) => {
    await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');

    await page.selectOption('select#departing', { label: 'July' });
    await page.selectOption('select#returning', { label: 'December' });
    await page.getByLabel('Promotional Code').fill('AF12-3456');
    await page.click('input[type="submit"]');

    await page.click('a:has-text("Back")');

    await expect(page).toHaveURL('https://marsair.recruiting.thoughtworks.net/WeiLianLow');
    const departingValue = await page.inputValue('select#departing');
    const returningValue = await page.inputValue('select#returning');
    const promoCodeValue = await page.inputValue('input#promotional_code');

    expect(departingValue).toBe('0'); // July
    expect(returningValue).toBe('1'); // December
    expect(promoCodeValue).toBe('AF12-3456');
  });
});
