import { test as setup } from '@playwright/test'
import { LoginPage } from './pages/LoginPage'

// фикстура не нужна так как используется один раз
setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!)
  await page.waitForURL('/')

  await page.context().storageState({ path: 'playwright/.auth/user.json' })
})
