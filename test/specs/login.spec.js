import * as main from '../page_objects/main'

describe('Login in to the application', () => {

    beforeEach(() => {
        await main.loginPage.open()
        await main.loginPage.checkLoginPgLoaded()
    })

    it('Login in in the herokuapp successfuly', async () => {
        await main.loginPage.login(testEnv.usernm, testEnv.password)
        await expect(browser).toHaveUrl(`${testEnv.url}/account`)
        const invoiceTitle = await $(main.INVOICES_SELECTORS.invoiceTitle)
        await expect(invoiceTitle).toBeDisplayed()     
    })


})