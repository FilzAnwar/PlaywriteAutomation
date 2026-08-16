class Checkout{
    constructor (page ){
         this.page = page
        //  this.cartButton = page.locator('[data-test="shopping-cart-link"]')
        //  this.cartMessage = page.locator('.title')
         this.checkoutButton= page .locator('//*[@id="checkout"]')
         this.infopage=page.locator('//*[@id="header_container"]/div[2]/span')
         this.firstname=page.locator('//*[@id="first-name"]')
         this.lastname = page.locator ('//*[@id="last-name"]')
         this.zip = page.locator('//*[@id="postal-code"]')
         this.continueButton = page.locator('//*[@id="continue"]')
         this.overviewpage= page.locator('//*[@id="header_container"]/div[2]/span')
         this.finishButton=page.locator('//*[@id="finish"]')
         this.checkoutEnd=page.locator('//*[@id="header_container"]/div[2]/span')
         this.generatepdf=page.locator('//*[@id="generate-pdf-order"]')



    }
    async checkout(firstName, lastName, postalCode){
      await this.checkoutButton.click();
      await this.firstname.fill(firstName);
      await this.lastname.fill(lastName);
      await this.zip.fill(postalCode);
      await this.continueButton.click()
      await this.finishButton.click()


    }
   
}
export default Checkout