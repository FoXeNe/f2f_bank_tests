import { Page, Locator } from '@playwright/test'

export class RegisterPage {
  readonly page: Page
  readonly registerLink: Locator
  readonly nameInput: Locator
  readonly surnameInput: Locator
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly registerButton: Locator

  constructor(page: Page) {
    this.page = page
    this.registerLink = page.getByRole('link', { name: 'Register page' })
    this.nameInput = page.getByRole('textbox', { name: 'Type your name' })
    this.surnameInput = page.getByRole('textbox', { name: 'Type your surname' })
    this.emailInput = page.getByRole('textbox', { name: 'Type your email' })
    this.passwordInput = page.getByRole('textbox', { name: 'Type your message...' })
    this.registerButton = page.getByRole('button', { name: 'Register' })
  }

  async goto() {
    await this.page.goto('/register')
  }

  async register(name: string, surname: string, email: string, pass: string) {
    await this.nameInput.fill(name)
    await this.surnameInput.fill(surname)
    await this.emailInput.fill(email)
    await this.passwordInput.fill(pass)
    await this.registerButton.click()

    await this.page.waitForURL('**/login')
  }

  async createNewUser() {
    const name = 'Ivan'
    const surname = 'Ivanov'
    const email = `${Date.now()}@example.com`
    const password = '123'
    await this.register(name, surname, email, password)

    return { email, password }
  }
}
