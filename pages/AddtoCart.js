class AddToCart{
    constructor (page ){
         this.page = page
         this.cartButton = page.locator('[data-test="shopping-cart-link"]')

    }
    async addtoCart(productTestId){
        await this.page.locator(`[data-test="${productTestId}"]`)
            .click();
    }
    async openCart(){
        await this.cartButton.click()
    }
}
export default AddToCart