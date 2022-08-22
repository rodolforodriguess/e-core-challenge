import * as main from '../page_objects/main'

describe('Check invoice information', () => {

    beforeEach(async ()=> {
        await main.loginPage.open()
        await main.loginPage.checkLoginPgLoaded()
        await main.loginPage.login(testEnv.usernm, testEnv.password)
    })

    it('Check invoice information which should match data table provided', async () => {
        await main.invoicesPage.openInvoice(0)
        await main.invoicesPage.switchWindow(0)
        const hName = await $(main.INV_DETAILS_SELECTOR.hotelInf)
        await expect(hName).toHaveText(main.invoiceData[0].hotelName)
        const invoiceDate = await $(main.INV_DETAILS_SELECTOR.invDateInf).then(el => el.getText())
        await expect(invoiceDate.replace('Invoice Date: ', '')).toEqual(main.invoiceData[0].invoiceDate)
        const dueDate = await $(main.INV_DETAILS_SELECTOR.invDueDateInf).then(el => el.getText())
        await expect(dueDate.replace('Due Date: ', '')).toEqual(main.invoiceData[0].dueDate)
        const invoiceNumber = await $(main.INV_DETAILS_SELECTOR.invoiceInf).then(el => el.getText())
        await expect(invoiceNumber.replace(/[^0-9]/g, '')).toEqual(main.invoiceData[0].invoiceNumber)
        const customerDetails = await $(main.INV_DETAILS_SELECTOR.customerDetails)
        await expect(customerDetails).toHaveTextContaining(
            main.invoiceData[0].customerDt1 + "\n" +
            main.invoiceData[0].customerDt2 + "\n" +
            main.invoiceData[0].customerDt3
        )
        const bookingDt = await $$(main.INV_DETAILS_SELECTOR.bookingStayDetails)
        await expect(bookingDt[0]).toHaveText(main.invoiceData[0].bookingCode)
        await expect(bookingDt[1]).toHaveText(main.invoiceData[0].room)
        await expect(bookingDt[4]).toHaveText(main.invoiceData[0].checkIn)
        await expect(bookingDt[5]).toHaveText(main.invoiceData[0].checkOut)
        await expect(bookingDt[2]).toHaveText(main.invoiceData[0].totalStayCount)
        await expect(bookingDt[3]).toHaveText(main.invoiceData[0].totalStayAmount)
        const billing = await $$(main.INV_DETAILS_SELECTOR.billingDetails)
        await expect(billing[0]).toHaveText(main.invoiceData[0].depositNow)
        await expect(billing[1]).toHaveText(main.invoiceData[0].taxVAT)
        await expect(billing[2]).toHaveText(main.invoiceData[0].totalAmount)
    })
})