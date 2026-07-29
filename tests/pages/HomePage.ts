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
  readonly transferComplete: Locator
  readonly newTransfer: Locator

  constructor(page: Page) {
    this.page = page
    this.number = page.getByRole('textbox', { name: '+7 999 123-45-' })
    this.amount = page.getByRole('spinbutton', { name: '0.00' })
    this.purpose = page.getByRole('textbox', { name: 'e.g. debt repayment' })
    this.sendButton = page.getByRole('button', { name: 'Send' })
    this.cancel = page.getByRole('button', { name: 'Cancel' })
    this.phoneError = page.getByText('Phone number is required')
    this.transferComplete = page.getByText('Transfer completed', { exact: true })
    this.newTransfer = page.getByRole('button', { name: 'New transfer' })
    this.navBar = new NavBar(page)
  }

  async goto() {
    await this.page.goto('/')
  }

  async send() {
    await this.sendButton.click()
  }

  async fill(phone: string, amount: string, purpose: string) {
    await this.number.fill(phone)
    await this.amount.fill(amount)
    await this.purpose.fill(purpose)
  }

  async transfer(phone: string, amount: string, purpose: string) {
    await this.fill(phone, amount, purpose)
    await this.send()
  }

  async blurPhoneNumber() {
    await this.number.focus()
    await this.number.blur()
  }
}
