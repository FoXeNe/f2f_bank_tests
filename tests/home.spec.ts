import { test, expect } from './fixtures'

test.describe("Home", () => {
  // тесты в одном аккаунте меняют общий баланс, без serial возникает race condition
  test.describe.configure({ mode: 'serial' })

  test('[Критический] трансфер с заполненными полями', async ({ homePage, page }) => {
    await homePage.transfer('+7 999 123 45 67', '1', 'test')

    await expect(homePage.transferComplete).toBeVisible()
  })

  test('[Критический] смена баланса после успешного трансфера', async ({ homePage, page }) => {
    const beforeAmount = Number((await homePage.navBar.balance.textContent())?.slice(9)) // берем строку "before: <num>" и отсекаем все до <num>
    await homePage.transfer('+7 999 123 45 67', '1', 'test')

    await expect(homePage.navBar.balance).toHaveText(`Balance: ${beforeAmount - 1}`)
  })

  test('[Высокий] ошибка при недостаточном балансе', async ({ homePage, page }) => {
    const currentBalance = Number((await homePage.navBar.balance.textContent())?.slice(9))
    await homePage.transfer('+7 999 123 45 67', `${currentBalance + 1}`, 'test')

    await expect(homePage.snackbar).toHaveText('Transfer failed. Check your balance.')
  })

  test('[Средний] не отправляется форма с пустыми полями', async ({ homePage, page }) => {
    await homePage.send()

    await expect(page).toHaveURL('/')
    await expect(homePage.sendButton).toBeVisible()
  })

  test('[Средний] нажатие кнопки нового трансфера после успешного транфсера', async ({ homePage, page }) => {
    await homePage.transfer('+7 999 123 45 67', '1', 'test')
    await homePage.newTransfer.click()

    await expect(homePage.sendButton).toBeVisible()
  })

  test('[Средний] ошибка при сумме перевода <= 0', async ({ homePage, page }) => {
    await homePage.transfer('+7 999 123 45 67', '0', 'test')

    await expect(homePage.snackbar).toHaveText('Amount must be greater than zero')
  })

  test('[Низкий] ошибка Phone Number при заполненных Amount и Purpose', async ({ homePage, page }) => {
    await homePage.transfer('', '1', 'test')

    await expect(homePage.phoneError).toHaveText('Phone number is required')
  })

  test('[Низкий] ошибка Phone Number при отведении фокуса с поля Phone Number', async ({ homePage, page }) => {
    await homePage.blurPhoneNumber()

    await expect(homePage.phoneError).toHaveText('Phone number is required')
  })

  test('[Низкий] ошибка при неверном формате телефона', async ({ homePage, page }) => {
    await homePage.transfer('89991234567', '1', 'test')

    await expect(homePage.phoneError).toHaveText('Must start with + and country code. Example: +7 999 123-45-67')
  })
})
