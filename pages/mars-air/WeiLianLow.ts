import { Page, Locator } from '@playwright/test';

export class MarsAirPage {
  readonly page: Page;
  readonly departingSelect: Locator;
  readonly returningSelect: Locator;
  readonly promoCodeInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.departingSelect = page.getByLabel('Departing');
    this.returningSelect = page.getByLabel('Returning');
    this.promoCodeInput = page.getByRole('textbox', { name: 'Promotional Code' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
  }

  async goto() {
    await this.page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');
  }
}
