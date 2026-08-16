class AddToCart{
    constructor (page ){
         this.page = page
         this.cartButton = page.locator('[data-test="shopping-cart-link"]')
         this.cartItems = page.locator('.cart_item');

    }
    async addtoCart(productTestId){
        await this.page.locator(`[data-test="${productTestId}"]`)
            .click();
    }
    async openCart(){
        await this.cartButton.click()
    }
    // Encapsulates product verification inside the page object
    getCartItemByName(productName) {
        return this.cartItems.filter({ hasText: productName });
    }
}
export default AddToCart