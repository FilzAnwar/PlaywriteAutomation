class HomePage{
    constructor(page){
        this.page=page
        // this.cartButton=page.locator('//*[@id="add-to-cart-sauce-labs-fleece-jacket"]')
        //  this.viewProduct=page.locator('//*[@id="item_5_title_link"]/div')
         this.sortButton = page.locator(
            '[data-test="product-sort-container"]'
        );

        this.sortbyZtoA = page.locator(
            '[data-test="product-sort-container"]'
        );

        this.expectSortZtoA = page.locator(
            '[data-test="inventory-container"]'
        );
    }
    async gotoURL(){
        await this.page.goto('https://www.saucedemo.com/inventory.html')
    }
    async home(){
        // await this.addtocartButton.click()
        // await this.viewProduct.click()
        await this.sortButton.selectOption('za')
        



    }
}
export default HomePage