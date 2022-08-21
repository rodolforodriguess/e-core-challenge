import * as main from '../page_objects/main'

describe('Login in to the application', () => {

    it('Login in in the herokuapp successfuly', async () => {
        console.log(main.loginData)
        await main.loginPage.open()
        await main.loginPage.checkLoginPgLoaded()
        await main.loginPage.login(testEnv.usernm, testEnv.password)
        await expect(browser).toHaveUrl(`${testEnv.url}/account`)
        const invoiceTitle = await $(main.INVOICES_SELECTORS.invoiceTitle)
        await expect(invoiceTitle).toBeDisplayed()     
    })

    for(const item of main.logindata){
        it(`Should display an alert message when user types incorrect login data as user ${item.username} and password ${item.password}`, async () => {
            await main.loginPage.open()
            await main.loginPage.checkLoginPgLoaded()
            await main.loginPage.login(item.username, item.password)
            const msg = await $(main.LOGIN_SELECTORS.alertMsg).then(el => el.getText())
            await expect(msg).toEqual('Wrong username or password.')
            await browser.reloadSession()
        })
    }


})