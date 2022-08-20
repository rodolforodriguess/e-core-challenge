import * as main from './main'

class Login {

    async open() {
        await browser.url('/');
    }

    async login(username, password){
        const loginField = await $(main.LOGIN_SELECTORS.username)
        await loginField.addValue(username)
        const passwordFiled = await $(main.LOGIN_SELECTORS.password)
        await passwordFiled.addValue(password)
        const loginBtn = await $(main.LOGIN_SELECTORS.loginBtn)
        await loginBtn.click()
        //await browser.pause(2000)
    }

    async checkLoginPgLoaded(){
        await expect(browser).toHaveUrl(`${testEnv.url}/`)
        const title = await $(main.LOGIN_SELECTORS.loginTitle)
        await title.waitForDisplayed()
    }


}


export const loginPage = new Login()