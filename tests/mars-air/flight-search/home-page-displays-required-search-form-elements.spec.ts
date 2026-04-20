// spec: specs/mars-air/flight-search/test_plan.md

import { test, expect } from '@playwright/test';

test.describe('Search Form Structure', () => {
  test('Home page displays all required search form elements', async ({ page }) => {
    // 1. Navigate to the MarsAir home page
    await page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');

    // Verify page title
    await expect(page).toHaveTitle('Mars Airlines: Home');

    // Verify heading is visible
    await expect(page.getByRole('heading', { name: 'Book a ticket to the red planet now!' })).toBeVisible();

    // Verify Departing dropdown is present
    await expect(page.getByLabel('Departing')).toBeVisible();

    // Verify Returning dropdown is present
    await expect(page.getByLabel('Returning')).toBeVisible();

    // Verify Promotional Code text input is present
    await expect(page.getByLabel('Promotional Code')).toBeVisible();

    // Verify Search button is present
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
  });
});
