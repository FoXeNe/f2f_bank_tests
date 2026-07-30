import { test, expect } from './fixtures'

test.describe('Transactions', () => {
  test('[Критический] успешное пополнение баланса', async ({ transactionsPage }) => {
    await transactionsPage.addBalance(150)
    const firstRowSum = transactionsPage.getCell(0, 4)

    await expect(firstRowSum).toHaveText('150')
  })

  test('[Высокий] корректное отображение формата времени транзакции', async ({ transactionsPage }) => {
    await transactionsPage.addBalance(10)
    const dateCell = transactionsPage.getCell(0, 1)

    await expect(dateCell).toHaveText(/[0-9\/]+, [0-9:]+ [AP]M/)
  })

  test('[Высокий] корректное отображение Type и Status', async ({ transactionsPage }) => {
    test.fail(true, 'Баг 4: перепутанные колонки Type и Status')

    await transactionsPage.addBalance(25)
    const typeCell = transactionsPage.getCell(0, 2)
    const statusCell = transactionsPage.getCell(0, 3)

    await expect(typeCell).toHaveText('deposit')
    await expect(statusCell).toHaveText('completed')
  })

  test('[Высокий] ввод 9 100 раз', async ({ transactionsPage, page }) => {
    const number = '9'.repeat(100)
    await transactionsPage.addBalance(number)

    await expect(page).toHaveURL('/transactions')
  })

  test('[Средний] пополнение баланса с отрицательным значением', async ({ transactionsPage }) => {
    await transactionsPage.addBalance(-50)

    const firstRowSum = transactionsPage.getCell(0, 4)
    await expect(firstRowSum).not.toHaveText('-50')
  })

  test('[Средний] пополнение баланса с нулевым значением', async ({ transactionsPage }) => {
    await transactionsPage.addBalance(0)

    const firstRowSum = transactionsPage.getCell(0, 4)
    await expect(firstRowSum).not.toHaveText('0')
  })
})
