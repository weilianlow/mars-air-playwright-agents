// spec: specs/mars-air/promo-code.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { MarsAirPage } from '../../pages/mars-air/WeiLianLow';

test.describe('Valid Promo Codes (AC1)', () => {
  test('Valid promo code with 30% discount', async ({ page }) => {
    // 1. Navigate to https://marsair.recruiting.thoughtworks.net/WeiLianLow
    const marsAirPage = new MarsAirPage(page);
    await marsAirPage.goto();

    // 2. Select "July" from the Departing dropdown
    await marsAirPage.departingSelect.selectOption(['July']);

    // 3. Select "December (two years from now)" from the Returning dropdown
    await marsAirPage.returningSelect.selectOption(['December (two years from now)']);

    // 4. Enter `AF3-FJK-418` in the Promotional Code field
    await marsAirPage.promoCodeInput.fill('AF3-FJK-418');

    // 5. Click the Search button
    await marsAirPage.searchButton.click();

    // Expected Result: Page displays success message with 30% discount
    await expect(marsAirPage.seatsAvailableMessage).toBeVisible();
    await expect(marsAirPage.getPromoCodeUsedMessage('AF3-FJK-418')).toBeVisible();
    await expect(page.getByText('30% discount')).toBeVisible();
    await expect(marsAirPage.callNowMessage).toBeVisible();
  });

  test('Valid promo code with 20% discount (BVA: lower boundary)', async ({ page }) => {
    // 1. Navigate to https://marsair.recruiting.thoughtworks.net/WeiLianLow
    const marsAirPage = new MarsAirPage(page);
    await marsAirPage.goto();

    // 2. Select "July" from the Departing dropdown
    await marsAirPage.departingSelect.selectOption(['July']);

    // 3. Select "December (two years from now)" from the Returning dropdown
    await marsAirPage.returningSelect.selectOption(['December (two years from now)']);

    // 4. Enter `AB2-CDE-204` in the Promotional Code field
    await marsAirPage.promoCodeInput.fill('AB2-CDE-204');

    // 5. Click the Search button
    await marsAirPage.searchButton.click();

    // Expected Result: Page displays success message with 20% discount
    await expect(marsAirPage.seatsAvailableMessage).toBeVisible();
    await expect(marsAirPage.getPromoCodeUsedMessage('AB2-CDE-204')).toBeVisible();
    await expect(page.getByText('20% discount')).toBeVisible();
  });

  test('Valid promo code with 40% discount (BVA: upper boundary for valid sum)', async ({ page }) => {
    // 1. Navigate to https://marsair.recruiting.thoughtworks.net/WeiLianLow
    const marsAirPage = new MarsAirPage(page);
    await marsAirPage.goto();

    // 2. Select "July" from the Departing dropdown
    await marsAirPage.departingSelect.selectOption(['July']);

    // 3. Select "December (two years from now)" from the Returning dropdown
    await marsAirPage.returningSelect.selectOption(['December (two years from now)']);

    // 4. Enter `AF4-FJK-419` in the Promotional Code field
    // Checksum: 4+4+1=9, last digit=9 ✓ (sum is single digit)
    await marsAirPage.promoCodeInput.fill('AF4-FJK-419');

    // 5. Click the Search button
    await marsAirPage.searchButton.click();

    // Expected Result: Page displays success message with 40% discount
    await expect(marsAirPage.seatsAvailableMessage).toBeVisible();
    await expect(marsAirPage.getPromoCodeUsedMessage('AF4-FJK-419')).toBeVisible();
    await expect(page.getByText('40% discount')).toBeVisible();
  });

  test('Promo code with sum >= 10 is rejected (BUG-2)', async ({ page }) => {
    // 1. Navigate to https://marsair.recruiting.thoughtworks.net/WeiLianLow
    const marsAirPage = new MarsAirPage(page);
    await marsAirPage.goto();

    // 2. Select "July" from the Departing dropdown
    await marsAirPage.departingSelect.selectOption(['July']);

    // 3. Select "December (two years from now)" from the Returning dropdown
    await marsAirPage.returningSelect.selectOption(['December (two years from now)']);

    // 4. Enter `AF5-FJK-410` in the Promotional Code field
    // Checksum: 5+4+1=10, 10 mod 10 = 0, last digit=0 ✓ (theoretically valid)
    // BUG: App rejects codes where sum >= 10 (two-digit sum)
    await marsAirPage.promoCodeInput.fill('AF5-FJK-410');

    // 5. Click the Search button
    await marsAirPage.searchButton.click();

    // Expected Result: Code should be valid, but app has BUG-2
    await expect(marsAirPage.getInvalidCodeMessage('AF5-FJK-410')).toBeVisible();
    await expect(marsAirPage.getPromoCodeUsedMessage('AF5-FJK-410')).not.toBeVisible();
  });

  test('Valid promo code with 00% discount (Edge case: discount digit zero) - BUG-1', async ({ page }) => {
    // 1. Navigate to https://marsair.recruiting.thoughtworks.net/WeiLianLow
    const marsAirPage = new MarsAirPage(page);
    await marsAirPage.goto();

    // 2. Select "July" from the Departing dropdown
    await marsAirPage.departingSelect.selectOption(['July']);

    // 3. Select "December (two years from now)" from the Returning dropdown
    await marsAirPage.returningSelect.selectOption(['December (two years from now)']);

    // 4. Enter `ZZ0-XYZ-000` in the Promotional Code field
    await marsAirPage.promoCodeInput.fill('ZZ0-XYZ-000');

    // 5. Click the Search button
    await marsAirPage.searchButton.click();

    // Expected Result: Page displays success message with 00% discount
    // Note: This is BUG-1 - app may not handle 00% discount correctly
    await expect(marsAirPage.seatsAvailableMessage).toBeVisible();
    await expect(marsAirPage.getPromoCodeUsedMessage('ZZ0-XYZ-000')).toBeVisible();
    await expect(page.getByText('00% discount')).toBeVisible();
  });

  test('Valid promo code with checksum wrapping (sum > 10) - BUG-2', async ({ page }) => {
    // 1. Navigate to https://marsair.recruiting.thoughtworks.net/WeiLianLow
    const marsAirPage = new MarsAirPage(page);
    await marsAirPage.goto();

    // 2. Select "July" from the Departing dropdown
    await marsAirPage.departingSelect.selectOption(['July']);

    // 3. Select "December (two years from now)" from the Returning dropdown
    await marsAirPage.returningSelect.selectOption(['December (two years from now)']);

    // 4. Enter `JJ5-OPQ-320` in the Promotional Code field
    // Checksum: 5+3+2=10, 10 mod 10 = 0, last digit=0 ✓ (theoretically valid)
    // BUG-2: App rejects codes where sum >= 10 (two-digit sum)
    await marsAirPage.promoCodeInput.fill('JJ5-OPQ-320');

    // 5. Click the Search button
    await marsAirPage.searchButton.click();

    // Expected Result: Code should be valid, but app has BUG-2
    await expect(marsAirPage.getInvalidCodeMessage('JJ5-OPQ-320')).toBeVisible();
    await expect(marsAirPage.getPromoCodeUsedMessage('JJ5-OPQ-320')).not.toBeVisible();
  });
});

test.describe('Invalid Promo Codes (AC2)', () => {
  test('Invalid promo code - wrong checksum (one above)', async ({ page }) => {
    // 1. Navigate to https://marsair.recruiting.thoughtworks.net/WeiLianLow
    const marsAirPage = new MarsAirPage(page);
    await marsAirPage.goto();

    // 2. Select "July" from the Departing dropdown
    await marsAirPage.departingSelect.selectOption(['July']);

    // 3. Select "December (two years from now)" from the Returning dropdown
    await marsAirPage.returningSelect.selectOption(['December (two years from now)']);

    // 4. Enter `AF3-FJK-419` in the Promotional Code field
    await marsAirPage.promoCodeInput.fill('AF3-FJK-419');

    // 5. Click the Search button
    await marsAirPage.searchButton.click();

    // Expected Result: Page displays error message
    await expect(marsAirPage.seatsAvailableMessage).toBeVisible();
    await expect(marsAirPage.getInvalidCodeMessage('AF3-FJK-419')).toBeVisible();
    await expect(marsAirPage.getPromoCodeUsedMessage('AF3-FJK-419')).not.toBeVisible();
  });

  test('Invalid promo code - wrong checksum (one below)', async ({ page }) => {
    // 1. Navigate to https://marsair.recruiting.thoughtworks.net/WeiLianLow
    const marsAirPage = new MarsAirPage(page);
    await marsAirPage.goto();

    // 2. Select "July" from the Departing dropdown
    await marsAirPage.departingSelect.selectOption(['July']);

    // 3. Select "December (two years from now)" from the Returning dropdown
    await marsAirPage.returningSelect.selectOption(['December (two years from now)']);

    // 4. Enter `AF3-FJK-417` in the Promotional Code field
    await marsAirPage.promoCodeInput.fill('AF3-FJK-417');

    // 5. Click the Search button
    await marsAirPage.searchButton.click();

    // Expected Result: Page displays error message
    await expect(marsAirPage.seatsAvailableMessage).toBeVisible();
    await expect(marsAirPage.getInvalidCodeMessage('AF3-FJK-417')).toBeVisible();
    await expect(marsAirPage.getPromoCodeUsedMessage('AF3-FJK-417')).not.toBeVisible();
  });

  test('Invalid promo code - completely invalid format (EP: invalid characters)', async ({ page }) => {
    // 1. Navigate to https://marsair.recruiting.thoughtworks.net/WeiLianLow
    const marsAirPage = new MarsAirPage(page);
    await marsAirPage.goto();

    // 2. Select "July" from the Departing dropdown
    await marsAirPage.departingSelect.selectOption(['July']);

    // 3. Select "December (two years from now)" from the Returning dropdown
    await marsAirPage.returningSelect.selectOption(['December (two years from now)']);

    // 4. Enter `123-456-789` in the Promotional Code field
    await marsAirPage.promoCodeInput.fill('123-456-789');

    // 5. Click the Search button
    await marsAirPage.searchButton.click();

    // Expected Result: Page displays error message
    await expect(marsAirPage.getInvalidCodeMessage('123-456-789')).toBeVisible();
    await expect(marsAirPage.getPromoCodeUsedMessage('123-456-789')).not.toBeVisible();
  });

  test('Invalid promo code - missing hyphens (EP: format violation)', async ({ page }) => {
    // 1. Navigate to https://marsair.recruiting.thoughtworks.net/WeiLianLow
    const marsAirPage = new MarsAirPage(page);
    await marsAirPage.goto();

    // 2. Select "July" from the Departing dropdown
    await marsAirPage.departingSelect.selectOption(['July']);

    // 3. Select "December (two years from now)" from the Returning dropdown
    await marsAirPage.returningSelect.selectOption(['December (two years from now)']);

    // 4. Enter `AF3FJK418` in the Promotional Code field
    await marsAirPage.promoCodeInput.fill('AF3FJK418');

    // 5. Click the Search button
    await marsAirPage.searchButton.click();

    // Expected Result: Page displays error message
    await expect(marsAirPage.getInvalidCodeMessage('AF3FJK418')).toBeVisible();
    await expect(marsAirPage.getPromoCodeUsedMessage('AF3FJK418')).not.toBeVisible();
  });

  test('Invalid promo code - empty string (EP: boundary)', async ({ page }) => {
    // 1. Navigate to https://marsair.recruiting.thoughtworks.net/WeiLianLow
    const marsAirPage = new MarsAirPage(page);
    await marsAirPage.goto();

    // 2. Select "July" from the Departing dropdown
    await marsAirPage.departingSelect.selectOption(['July']);

    // 3. Select "December (two years from now)" from the Returning dropdown
    await marsAirPage.returningSelect.selectOption(['December (two years from now)']);

    // 4. Clear the Promotional Code field (leave empty)
    await marsAirPage.promoCodeInput.fill('');

    // 5. Click the Search button
    await marsAirPage.searchButton.click();

    // Expected Result: Page displays "Seats available!" with no promo code message
    await expect(marsAirPage.seatsAvailableMessage).toBeVisible();
    await expect(marsAirPage.getPromoCodeUsedMessage('')).not.toBeVisible();
  });

  test('Invalid promo code - special characters (EP: invalid input)', async ({ page }) => {
    // 1. Navigate to https://marsair.recruiting.thoughtworks.net/WeiLianLow
    const marsAirPage = new MarsAirPage(page);
    await marsAirPage.goto();

    // 2. Select "July" from the Departing dropdown
    await marsAirPage.departingSelect.selectOption(['July']);

    // 3. Select "December (two years from now)" from the Returning dropdown
    await marsAirPage.returningSelect.selectOption(['December (two years from now)']);

    // 4. Enter `A@3-#JK-41&` in the Promotional Code field
    await marsAirPage.promoCodeInput.fill('A@3-#JK-41&');

    // 5. Click the Search button
    await marsAirPage.searchButton.click();

    // Expected Result: Page displays error message
    await expect(marsAirPage.getInvalidCodeMessage('A@3-#JK-41&')).toBeVisible();
    await expect(marsAirPage.getPromoCodeUsedMessage('A@3-#JK-41&')).not.toBeVisible();
  });
});

test.describe('Checksum Validation (AC3)', () => {
  test('Checksum validation - correct checksum', async ({ page }) => {
    // 1. Navigate to https://marsair.recruiting.thoughtworks.net/WeiLianLow
    const marsAirPage = new MarsAirPage(page);
    await marsAirPage.goto();

    // 2. Select "July" from the Departing dropdown
    await marsAirPage.departingSelect.selectOption(['July']);

    // 3. Select "December (two years from now)" from the Returning dropdown
    await marsAirPage.returningSelect.selectOption(['December (two years from now)']);

    // 4. Enter `AF3-FJK-418` in the Promotional Code field
    await marsAirPage.promoCodeInput.fill('AF3-FJK-418');

    // 5. Click the Search button
    await marsAirPage.searchButton.click();

    // Expected Result: Code is accepted as valid
    await expect(marsAirPage.seatsAvailableMessage).toBeVisible();
    await expect(marsAirPage.getPromoCodeUsedMessage('AF3-FJK-418')).toBeVisible();
    await expect(page.getByText('30% discount')).toBeVisible();
    await expect(marsAirPage.getInvalidCodeMessage('AF3-FJK-418')).not.toBeVisible();
  });

  test('Checksum validation - incorrect checksum (BVA: boundary)', async ({ page }) => {
    // 1. Navigate to https://marsair.recruiting.thoughtworks.net/WeiLianLow
    const marsAirPage = new MarsAirPage(page);
    await marsAirPage.goto();

    // 2. Select "July" from the Departing dropdown
    await marsAirPage.departingSelect.selectOption(['July']);

    // 3. Select "December (two years from now)" from the Returning dropdown
    await marsAirPage.returningSelect.selectOption(['December (two years from now)']);

    // 4. Enter `AF3-FJK-419` in the Promotional Code field
    await marsAirPage.promoCodeInput.fill('AF3-FJK-419');

    // 5. Click the Search button
    await marsAirPage.searchButton.click();

    // Expected Result: Code is rejected as invalid
    await expect(marsAirPage.seatsAvailableMessage).toBeVisible();
    await expect(marsAirPage.getInvalidCodeMessage('AF3-FJK-419')).toBeVisible();
    await expect(marsAirPage.getPromoCodeUsedMessage('AF3-FJK-419')).not.toBeVisible();
  });

  test('Checksum validation - multiple digits sum (EP: complex calculation)', async ({ page }) => {
    // 1. Navigate to https://marsair.recruiting.thoughtworks.net/WeiLianLow
    const marsAirPage = new MarsAirPage(page);
    await marsAirPage.goto();

    // 2. Select "July" from the Departing dropdown
    await marsAirPage.departingSelect.selectOption(['July']);

    // 3. Select "December (two years from now)" from the Returning dropdown
    await marsAirPage.returningSelect.selectOption(['December (two years from now)']);

    // 4. Enter `AF4-FJK-408` in the Promotional Code field
    // Checksum: 4+4+0=8, last digit=8 ✓ (sum is single digit)
    await marsAirPage.promoCodeInput.fill('AF4-FJK-408');

    // 5. Click the Search button
    await marsAirPage.searchButton.click();

    // Expected Result: Code is accepted as valid with 40% discount
    await expect(marsAirPage.seatsAvailableMessage).toBeVisible();
    await expect(marsAirPage.getPromoCodeUsedMessage('AF4-FJK-408')).toBeVisible();
    await expect(page.getByText('40% discount')).toBeVisible();
  });

  test('Checksum validation - all zeros (Edge case)', async ({ page }) => {
    // 1. Navigate to https://marsair.recruiting.thoughtworks.net/WeiLianLow
    const marsAirPage = new MarsAirPage(page);
    await marsAirPage.goto();

    // 2. Select "July" from the Departing dropdown
    await marsAirPage.departingSelect.selectOption(['July']);

    // 3. Select "December (two years from now)" from the Returning dropdown
    await marsAirPage.returningSelect.selectOption(['December (two years from now)']);

    // 4. Enter `AA0-BBB-000` in the Promotional Code field
    await marsAirPage.promoCodeInput.fill('AA0-BBB-000');

    // 5. Click the Search button
    await marsAirPage.searchButton.click();

    // Expected Result: Code is accepted as valid with 00% discount
    // Note: This is BUG-1 - app may not handle 00% discount correctly
    await expect(marsAirPage.seatsAvailableMessage).toBeVisible();
    await expect(marsAirPage.getPromoCodeUsedMessage('AA0-BBB-000')).toBeVisible();
    await expect(page.getByText('00% discount')).toBeVisible();
  });
});
