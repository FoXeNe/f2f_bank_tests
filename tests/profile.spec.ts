import { test, expect } from './fixtures.ts'

test.describe('Profile', () => {
  test('[Средний] совпадает ли username с введенным', async ({ profilePage }) => {
    const field = profilePage.nameField

    await expect(field).toHaveText(`Name: ${process.env.TEST_USER_NAME}`)
  })

  test('[Средний] совпадает ли surname с введенным', async ({ profilePage }) => {
    const field = profilePage.surnameField

    await expect(field).toHaveText(`Surname: ${process.env.TEST_USER_SURNAME}`)
  })

  test('[Средний] совпадает ли email с введенным', async ({ profilePage }) => {
    const field = profilePage.emailField

    await expect(field).toHaveText(`Email: ${process.env.TEST_USER_EMAIL}`)
  })
})
