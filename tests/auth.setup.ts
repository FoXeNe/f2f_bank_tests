import { test as setup } from '@playwright/test'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'

setup('authenticate', async ({ page }) => {
  const registerPage = new RegisterPage(page)
  await registerPage.goto()

  await registerPage.createNewUser()

  const loginPage = new LoginPage(page)
  await loginPage.goto()

  await loginPage.login(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!)
  await page.waitForURL('/')

  await page.context().storageState({ path: 'playwright/.auth/user.json' })
})
