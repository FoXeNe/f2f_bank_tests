import { test, expect } from './fixtures'


test.describe('NavBar', () => {
  test('[Критический] логаут при нажатии на кнопку', async ({ homePage, page }) => {
    await homePage.navBar.logoutButton.click()

    await expect(page).toHaveURL('/login')
  })

  test('[Высокий] редирект на страницу main при нажатии на кнопку', async ({ homePage, page }) => {
    await homePage.navBar.mainLink.click()

    await expect(page).toHaveURL('/')
  })

  test('[Высокий] редирект на страницу profile при нажатии на кнопку', async ({ homePage, page }) => {
    await homePage.navBar.profileLink.click()

    await expect(page).toHaveURL('/profile')
  })

  test('[Высокий] редирект на страницу transactions при нажатии на кнопку', async ({ homePage, page }) => {
    await homePage.navBar.transactionsLink.click()

    await expect(page).toHaveURL('/transactions')
  })
})
