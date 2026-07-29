import type { Page } from '@playwright/test'

export class LoginPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/login')
  }

  async fillEmail(email: string) {
    await this.page.getByRole('textbox', { name: 'Type your email' }).fill(email)
  }

  async fillPassword(password: string) {
    await this.page.getByRole('textbox', { name: 'Type your password' }).fill(password)
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Login' }).click()
  }

  async login(email: string, password: string) {
    await this.fillEmail(email)
    await this.fillPassword(password)
    await this.submit()
  }
}
