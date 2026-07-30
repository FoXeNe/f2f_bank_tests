import { test, expect } from './fixtures'

test.describe("Home", () => {

  test('[Критический] трансфер с заполненными полями', async ({ homePage }) => {
    await homePage.upAndTransfer('+7 999 123 45 67', '1', 'test')

    await expect(homePage.transferComplete).toBeVisible()
  })

  test('[Критический] смена баланса после успешного трансфера', async ({ homePage }) => {
    const balanceText = await homePage.navBar.balance.innerText()

    const parts = balanceText.split(':')
    const beforeAmount = Number(parts[1].trim())

    await homePage.upAndTransfer('+7 999 123 45 67', '1', 'test')

    await expect(homePage.navBar.balance).toHaveText(`Balance: ${beforeAmount}`)
  })

  test('[Высокий] ошибка при недостаточном балансе', async ({ homePage }) => {
    const currentBalance = Number((await homePage.navBar.balance.textContent())?.slice(9))
    await homePage.transfer('+7 999 123 45 67', `${currentBalance + 1}`, 'test')

    await expect(homePage.snackbar).toHaveText('Transfer failed. Check your balance.')
  })

  test('[Средний] не отправляется форма с пустыми полями', async ({ homePage, page }) => {
    await homePage.send()

    await expect(page).toHaveURL('/')
    await expect(homePage.sendButton).toBeVisible()
  })

  test('[Средний] нажатие кнопки нового трансфера после успешного трансфера', async ({ homePage }) => {
    await homePage.upAndTransfer('+7 999 123 45 67', '1', 'test')
    await homePage.newTransfer.click()

    await expect(homePage.sendButton).toBeVisible()
  })

  test('[Средний] ошибка при сумме перевода <= 0', async ({ homePage }) => {
    await homePage.transfer('+7 999 123 45 67', '0', 'test')

    await expect(homePage.snackbar).toHaveText('Amount must be greater than zero')
  })

  test('[Низкий] ошибка Phone Number при заполненных Amount и Purpose', async ({ homePage }) => {
    await homePage.upAndTransfer('', '1', 'test')

    await expect(homePage.phoneError).toHaveText('Phone number is required')
  })

  test('[Низкий] ошибка Phone Number при отведении фокуса с поля Phone Number', async ({ homePage }) => {
    await homePage.blurPhoneNumber()

    await expect(homePage.phoneError).toHaveText('Phone number is required')
  })

  test('[Низкий] ошибка при неверном формате телефона', async ({ homePage }) => {
    await homePage.upAndTransfer('89991234567', '1', 'test')

    await expect(homePage.phoneError).toHaveText('Must start with + and country code. Example: +7 999 123-45-67')
  })
})
