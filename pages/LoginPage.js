class LoginPage {
    constructor(page) {
        this.page = page
        this.username = page.locator('#user-name')
        this.password = page.locator('#password')
        this.loginButton = page.locator('#login-button')
        this.validmessageLocator = page.locator('#header_container > div.header_secondary_container > span')
        this.invalidmessageLocator= page.locator('#login_button_container > div > form > div.error-message-container.error > h3')


    }
    async gotoURL() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}

export default LoginPage