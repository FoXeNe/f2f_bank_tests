import { test as setup } from '@playwright/test'
import { LoginPage } from './pages/LoginPage'

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login('user@example.com', 'password123')
  await page.waitForURL('/')

  await page.context().storageState({ path: 'playwright/.auth/user.json' })
})
