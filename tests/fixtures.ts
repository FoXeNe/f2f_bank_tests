import { test as base } from '@playwright/test'
import { LoginPage } from './pages/LoginPage'
import { HomePage } from './pages/HomePage'

type MyFixtures = {
  loginPage: LoginPage,
  homePage: HomePage
}

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await use(loginPage)
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page)
    await homePage.goto()
    await use(homePage)
  }
})

export { expect } from '@playwright/test'
