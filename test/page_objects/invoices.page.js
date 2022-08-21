import * as main from './main'

class Invoices {

    async openInvoice(positionInv){
        const invLink = await $$(main.INVOICES_SELECTORS.invoicesLinks)
        await invLink[positionInv].click()
    }

    async switchWindow(nmInvoice){
        await browser.switchWindow(testEnv.url + '/invoice/' + nmInvoice)
    }



}


export const invoicesPage = new Invoices()