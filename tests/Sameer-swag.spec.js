const {test,expect} = require('@Playwright/test')
const {LoginPage} = require('../tests/Pages/login.page')

test('Sameer-swag', async ({ browser }) => {
const context = await browser.newContext()
const page = await context.newPage()
const loginPage = new LoginPage(page)
await loginPage.Correctlogincreds()
await loginPage.Incorrectlogincreds()
await loginPage.addtocart()
})
