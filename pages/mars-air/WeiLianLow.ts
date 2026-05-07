import { Page, Locator } from '@playwright/test';

export class MarsAirPage {
  readonly page: Page;
  readonly departingSelect: Locator;
  readonly returningSelect: Locator;
  readonly promoCodeInput: Locator;
  readonly searchButton: Locator;
  readonly seatsAvailableMessage: Locator;
  readonly callNowMessage: Locator;
  readonly noSeatsMessage: Locator;
  readonly promoTextLink: Locator;
  readonly marsAirLogoLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.departingSelect = page.getByLabel('Departing');
    this.returningSelect = page.getByLabel('Returning');
    this.promoCodeInput = page.getByRole('textbox', { name: 'Promotional Code' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.seatsAvailableMessage = page.getByText('Seats available!');
    this.callNowMessage = page.getByText('Call now on 0800 MARSAIR to book!');
    this.noSeatsMessage = page.getByText('Sorry, there are no more seats available.');
    this.promoTextLink = page.getByRole('link', { name: 'Book a ticket to the red planet now!' });
    this.marsAirLogoLink = page.getByRole('link', { name: 'MarsAir' });
  }

  async goto() {
    await this.page.goto('https://marsair.recruiting.thoughtworks.net/WeiLianLow');
  }

  getPromoCodeUsedMessage(code: string): Locator {
    return this.page.getByText(`Promotional code ${code} used:`);
  }

  getInvalidCodeMessage(code: string): Locator {
    return this.page.getByText(`Sorry, code ${code} is not valid`);
  }
}
