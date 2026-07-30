import type { Page, Locator } from '@playwright/test'

export class TransactionsPage {
  readonly page: Page
  readonly transactionsTable: Locator
  readonly addBalanceButton: Locator
  readonly amountInput: Locator
  readonly confirmButton: Locator
  readonly cancelButton: Locator

  constructor(page: Page) {
    this.page = page
    this.transactionsTable = page.getByText('TransactionsAdd balanceOperation IDDateOperation TypeOperation')
    this.addBalanceButton = page.getByRole('button', { name: 'Add balance' })
    this.amountInput = page.getByPlaceholder('Enter sum')
    this.confirmButton = page.getByRole('button', { name: 'Add', exact: true })
    this.cancelButton = page.getByRole('button', { name: 'Cancel' })
  }

  async goto() {
    await this.page.goto('/transactions')
  }

  async addBalance(amount: string | number) {
    await this.addBalanceButton.click()
    await this.amountInput.fill(String(amount))
    await this.confirmButton.click()
  }

  getRow(index: number) {
    return this.transactionsTable.locator('tbody tr').nth(index)
  }

  getCell(rowIndex: number, colIndex: number) {
    return this.getRow(rowIndex).locator('td').nth(colIndex)
  }
}
