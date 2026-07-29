import { test, expect } from './fixtures'

test.describe("Home", () => {
  test('[Критический] трансфер с заполненными полями', async({ homePage, page }) => {
    await homePage.transfer('+7 999 123 45 67', '1', 'test')

    await expect(homePage.transferComplete).toBeVisible()
  })

  test('[Критический] смена баланса после успешного трансфера', async({ homePage, page }) => {
    const beforeAmount = Number((await homePage.navBar.balance.textContent())?.slice(9)) // берем строку "before: <num>" и отсекаем все до <num>
    await homePage.transfer('+7 999 123 45 67', '1', 'test')

    await expect(homePage.navBar.balance).toHaveText(`Balance: ${beforeAmount - 1}`)
  })

  test('[Средний] не отправляется форма с пустыми полями', async({ homePage, page }) => {
    await homePage.send()

    await expect(page).toHaveURL('/')
    await expect(homePage.sendButton).toBeVisible()
  })

  test('[Средний] нажатие кнопки нового трансфера после успешного транфсера', async({ homePage, page }) => {
    await homePage.transfer('+7 999 123 45 67', '1', 'test')
    await homePage.newTransfer.click()

    await expect(homePage.sendButton).toBeVisible()
  })

  test('[Низкий] ошибка Phone Number при заполненных Amount и Purpose', async({ homePage, page }) => {
    await homePage.transfer('', '1', 'test')

    await expect(homePage.phoneError).toBeVisible()
  })

  test('[Низкий] ошибка Phone Number при отведении фокуса с поля Phone Number', async({ homePage, page} ) => {
    await homePage.blurPhoneNumber()

    await expect(homePage.phoneError).toBeVisible()
  })
})
