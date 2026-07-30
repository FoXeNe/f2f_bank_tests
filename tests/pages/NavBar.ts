import type { Page, Locator } from '@playwright/test'

export class NavBar {
  readonly mainLink: Locator
  readonly profileLink: Locator
  readonly transactionsLink: Locator
  readonly logoutButton: Locator
  readonly balance: Locator

  constructor(page: Page) {
    this.mainLink = page.getByRole('link', { name: 'Main' })
    this.profileLink = page.getByRole('link', { name: 'Profile' })
    this.transactionsLink = page.getByRole('link', { name: 'Transactions' })
    this.logoutButton = page.getByRole('button').filter({ hasText: /^$/ })
    this.balance = page.getByRole('heading', { name: 'Balance:' })
  }
}
