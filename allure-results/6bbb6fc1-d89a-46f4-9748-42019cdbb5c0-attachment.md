# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.js >> login test case problem_user
- Location: tests\login.spec.js:107:5

# Error details

```
Error: page.goto: Test ended.
Call log:
  - navigating to "https://www.saucedemo.com/", waiting until "load"

```

# Test source

```ts
  1  | class LoginPage {
  2  |     constructor(page) {
  3  |         this.page = page
  4  |         this.username = page.locator('#user-name')
  5  |         this.password = page.locator('#password')
  6  |         this.loginButton = page.locator('#login-button')
  7  |         this.validmessageLocator = page.locator('#header_container > div.header_secondary_container > span')
  8  |         this.invalidmessageLocator= page.locator('#login_button_container > div > form > div.error-message-container.error > h3')
  9  | 
  10 | 
  11 |     }
  12 |     async gotoURL() {
> 13 |         await this.page.goto('https://www.saucedemo.com/');
     |                         ^ Error: page.goto: Test ended.
  14 |     }
  15 | 
  16 |     async login(username, password) {
  17 |         await this.username.fill(username);
  18 |         await this.password.fill(password);
  19 |         await this.loginButton.click();
  20 |     }
  21 | }
  22 | 
  23 | export default LoginPage
```