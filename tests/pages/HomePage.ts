import type { Page, Locator } from '@playwright/test'
import { NavBar } from './NavBar'
import { TransactionsPage } from './TransactionsPage'

export class HomePage {
  readonly page: Page
  readonly navBar: NavBar
  readonly transactionsPage: TransactionsPage
  readonly phoneInput: Locator
  readonly amountInput: Locator
  readonly purposeInput: Locator
  readonly sendButton: Locator
  readonly cancelButton: Locator
  readonly transferComplete: Locator
  readonly newTransfer: Locator
  readonly phoneError: Locator
  readonly snackbar: Locator

  constructor(page: Page) {
    this.page = page
    this.navBar = new NavBar(page)
    this.transactionsPage = new TransactionsPage(page)

    this.phoneInput = page.getByRole('textbox', { name: '+7 999 123-45-' })
    this.amountInput = page.getByRole('spinbutton', { name: '0.00' })
    this.purposeInput = page.getByRole('textbox', { name: 'e.g. debt repayment' })
    this.sendButton = page.getByRole('button', { name: 'Send' })
    this.cancelButton = page.getByRole('button', { name: 'Cancel' })
    this.transferComplete = page.getByText('Transfer completed', { exact: true })
    this.newTransfer = page.getByRole('button', { name: 'New transfer' })
    this.phoneError = page.locator('.field-error')
    this.snackbar = page.locator('.snackbar')
  }

  async goto() {
    await this.page.goto('/')
  }

  async send() {
    await this.sendButton.click()
  }

  async fill(phone: string, amount: string, purpose: string) {
    await this.phoneInput.fill(phone)
    await this.amountInput.fill(amount)
    await this.purposeInput.fill(purpose)
  }

  async upAndTransfer(phone: string, amount: string, purpose: string) {
    await this.transactionsPage.goto()
    await this.transactionsPage.addBalance(amount)

    await this.goto()
    await this.transfer(phone, amount, purpose)
  }

  async transfer(phone: string, amount: string, purpose: string) {
    await this.fill(phone, amount, purpose)
    await this.send()
  }

  async blurPhoneNumber() {
    await this.phoneInput.focus()
    await this.phoneInput.blur()
  }
}
