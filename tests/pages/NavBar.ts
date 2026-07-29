import type { Page, Locator } from '@playwright/test'

export class NavBar {
  readonly main: Locator
  readonly profile: Locator
  readonly transactions: Locator
  readonly logout: Locator
  readonly balance: Locator

  constructor(page: Page) {
    this.main = page.getByRole('link', { name: 'Main' })
    this.profile = page.getByRole('link', { name: 'Profile' })
    this.transactions = page.getByRole('link', { name: 'Transactions' })
    this.logout = page.getByRole('button').filter({ hasText: /^$/ })
    this.balance = page.getByRole('heading', { name: 'Balance:' })
  }
}
