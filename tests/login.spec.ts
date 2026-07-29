import { test, expect } from '@playwright/test'
import { LoginPage } from './pages/LoginPage'

test.describe('Login', () => {
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await loginPage.goto()
  })

  test('[Критический] успешный вход с правильными данными', async ({ page }) => {
    await loginPage.login('user@example.com', 'password123')

    await expect(page).toHaveURL('/')
  })

  test('[Высокий] ошибка при неверном пароле', async ({ page }) => {
    await loginPage.login('user@example.com', 'wrongpassword')

    await expect(page.getByText('Login failed')).toBeVisible()
  })

  test('[Средний] редирект авторизованного пользователя', async ({ page }) => {
    await loginPage.login('user@example.com', 'password123')

    await expect(page).toHaveURL('/')
  })

  test('[Средний] форма не отправляется с пустыми полями', async ({ page }) => {
    await loginPage.submit()

    await expect(page).toHaveURL('/login')
  })

  test('[Средний] форма не отправляется с некорректной почтой', async ({ page }) => {
    await loginPage.login('wrongemail', 'password123')

    await expect(page).toHaveURL('/login')
  })
})
