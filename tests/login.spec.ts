import { test, expect } from './fixtures'

test.use({ storageState: { cookies: [], origins: [] }})

test.describe('Login', () => {
  test('[Критический] успешный вход с правильными данными', async ({ loginPage, page }) => {
    await loginPage.login('user@example.com', 'password123')

    await expect(page).toHaveURL('/')
  })

  test('[Высокий] ошибка при неверном пароле', async ({ loginPage, page }) => {
    await loginPage.login('user@example.com', 'wrongpassword')

    await expect(loginPage.loginFailed).toBeVisible()
  })

  test('[Средний] редирект авторизованного пользователя', async ({ loginPage, page }) => {
    await loginPage.login('user@example.com', 'password123')

    await expect(page).toHaveURL('/')
  })

  test('[Средний] форма не отправляется с пустыми полями', async ({ loginPage, page }) => {
    await loginPage.submit()

    await expect(page).toHaveURL('/login')
  })

  test('[Средний] форма не отправляется с некорректной почтой', async ({ loginPage, page }) => {
    await loginPage.login('wrongemail', 'password123')

    await expect(page).toHaveURL('/login')
  })
})
