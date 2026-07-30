import { test as base } from '@playwright/test'
import { LoginPage } from './pages/LoginPage'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { TransactionsPage } from './pages/TransactionsPage'

type MyFixtures = {
  loginPage: LoginPage
  homePage: HomePage
  profilePage: ProfilePage
  transactionsPage: TransactionsPage
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
  },
  profilePage: async ({ page }, use) => {
    const profigePage = new ProfilePage(page)
    await profigePage.goto()
    await use(profigePage)
  },
  transactionsPage: async ({ page }, use) => {
    const transactionsPage = new TransactionsPage(page)
    await transactionsPage.goto()
    await use(transactionsPage)
  }
})

export { expect } from '@playwright/test'
