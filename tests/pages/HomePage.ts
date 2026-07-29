import type { Page, Locator } from '@playwright/test'
import { NavBar } from './NavBar'

export class HomePage {
  readonly page: Page
  readonly navBar: NavBar
  readonly number: Locator
  readonly amount: Locator
  readonly purpose: Locator
  readonly sendButton: Locator
  readonly cancel: Locator

  constructor(page: Page) {
    this.page = page
    this.number = page.getByRole('textbox', { name: '+7 999 123-45-' })
    this.amount = page.getByRole('spinbutton', { name: '0.00' })
    this.purpose = page.getByRole('textbox', { name: 'e.g. debt repayment' })
    this.sendButton = page.getByRole('button', { name: 'Send' })
    this.cancel = page.getByRole('button', { name: 'Cancel' })
    this.phoneError = page.getByText('Phone number is required')
  }

  async goto() {
    await this.page.goto('/')
  }

  async send() {
    await this.sendButton.click()
  }
}
