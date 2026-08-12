import { defineConfig } from "@playwright/test"

class LogoutPage {
    constructor(page) {
        this.page = page
        this.hamburger=page.locator('//*[@id="react-burger-menu-btn"]')
        this.logoutButton=page.locator('[data-test="logout-sidebar-link"]')
        this.message=page.locator('//*[@id="root"]/div/div[1]')
    }
    async logout(){
        await this.hamburger.click()
        await this.logoutButton.click()
    }


}

export default LogoutPage