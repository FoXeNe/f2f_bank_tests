import { Page, Locator } from '@playwright/test'

export class ProfilePage {
  readonly page: Page
  readonly nameField: Locator
  readonly surnameField: Locator
  readonly emailField: Locator

  constructor(page: Page) {
    this.page = page
    // в данном случае удобнее использовать регулярку, так как мы не знаем что идет после поля
    this.nameField = page.getByText(/Name:\s.*/)
    this.surnameField = page.getByText(/Surname:\s.*/)
    this.emailField = page.getByText(/Email:\s.*/)
  }

  async goto() {
    await this.page.goto('/profile')
  }
}
