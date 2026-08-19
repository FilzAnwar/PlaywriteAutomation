import { test, expect } from "@playwright/test";
class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator("#user-name");
    this.password = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.validmessageLocator = page.locator(
      "#header_container > div.header_secondary_container > span",
    );
    this.invalidmessageLocator = page.locator(
      "#login_button_container > div > form > div.error-message-container.error > h3",
    );
  }

  async attachScreenshot(name) {
    await test.info().attach(name, {
      body: await this.page.screenshot(),
      contentType: "image/png",
    });
  }
  async gotoURL() {
    await this.page.goto("https://www.saucedemo.com/");
    await this.attachScreenshot("01 - Login page opened");
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.attachScreenshot("02 - After entering username");

    await this.password.fill(password);
    await this.attachScreenshot("03 - After entering password");

    await this.loginButton.click();
    await this.attachScreenshot("04 - After clicking Login");
  }
}

export default LoginPage;
