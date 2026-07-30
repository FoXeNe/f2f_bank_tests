import { test, expect } from './fixtures'

test.use({ storageState: { cookies: [], origins: [] } })

test.describe('Registration', () => {
  test('[Критический] успешная регистрация нового пользователя', async ({ registerPage, page }) => {
    await registerPage.createNewUser()

    await expect(page).toHaveURL('/login')
  })

  test('[Средний] переход на страницу регистрации с главной', async ({ page, registerPage }) => {
    await page.goto('/')
    await registerPage.registerLink.click()

    await expect(page).toHaveURL('/register')
  })
})
