import * as main from './main'

class Invoices {

    async openInvoice(positionInv){
        const invLink = await $$(main.INVOICES_SELECTORS.invoicesLinks)
        await invLink[1].click()
        await browser.pause(4000)
    }



}


export const invoicesPage = new Invoices()