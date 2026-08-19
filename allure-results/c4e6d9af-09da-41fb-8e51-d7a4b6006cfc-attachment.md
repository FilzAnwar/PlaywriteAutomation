# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.js >> end to end encryption
- Location: tests\smoke.spec.js:2:5

# Error details

```
Error: download.saveAs: ENOENT: no such file or directory, copyfile 'C:\Users\Cartoon\PlaywriteAutomation\test-results\.playwright-artifacts-0\838ef911-0d75-4275-b26e-ae154b0fca8f' -> 'C:\Users\FA25-MSSE-0011\Downloads\swag-labs-order-2026-08-19_15-58-33.pdf'
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e10]: Swag Labs
      - generic [ref=e14]: "Checkout: Complete!"
    - generic [ref=e16]:
      - img "Pony Express" [ref=e17]
      - heading "Thank you for your order!" [level=2] [ref=e18]
      - generic [ref=e19]: Your order has been dispatched, and will arrive just as fast as the pony can get there!
      - generic [ref=e20]:
        - button "Back Home" [ref=e21] [cursor=pointer]
        - button "Generate PDF order" [active] [ref=e22] [cursor=pointer]
  - contentinfo [ref=e23]:
    - list [ref=e24]:
      - listitem [ref=e25]:
        - link "Twitter" [ref=e26] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e27]:
        - link "Facebook" [ref=e28] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e29]:
        - link "LinkedIn" [ref=e30] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e31]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | import {test , expect} from "@playwright/test"
  2  | test('end to end encryption', async({page})=>{
  3  | 
  4  |  
  5  | await page.goto('https://www.saucedemo.com/');
  6  | await page.fill('#user-name', 'standard_user');
  7  | await page.fill('#password' ,'secret_sauce');
  8  | await page.click('#login-button');
  9  |  await expect(page.locator('//*[@id="header_container"]/div[2]/span')).toHaveText("Products");
  10 | await page.click ('#add-to-cart-sauce-labs-backpack');
  11 | await page.click('//*[@id="shopping_cart_container"]/a/span');
  12 | await expect(page.locator('//*[@id="header_container"]/div[2]/span')).toHaveText("Your Cart");
  13 | await page.click('//*[@id="checkout"]');
  14 | await expect(page.locator('//*[@id="header_container"]/div[2]/span')).toHaveText('Checkout: Your Information');
  15 | await page.fill('//*[@id="first-name"]','Filza Anwar');
  16 | await page.fill('//*[@id="last-name"]',' Anwar')
  17 | await page.fill('//*[@id="postal-code"]','754600')
  18 | await page.click('//*[@id="continue"]');
  19 | await expect(page.locator('//*[@id="header_container"]/div[2]/span')).toHaveText('Checkout: Overview');
  20 | await page.click('//*[@id="finish"]');
  21 | await expect(page.locator('//*[@id="header_container"]/div[2]/span')).toHaveText('Checkout: Complete!');
  22 | await page.click('//*[@id="generate-pdf-order"]'); 
  23 | const downloadPromise = page.waitForEvent('download');
  24 | 
  25 | await page.click('//*[@id="generate-pdf-order"]');
  26 | 
  27 | const download = await downloadPromise;
  28 | 
  29 | expect(download.suggestedFilename()).toContain('.pdf');
  30 | 
  31 | 
> 32 | await download.saveAs(
     |                ^ Error: download.saveAs: ENOENT: no such file or directory, copyfile 'C:\Users\Cartoon\PlaywriteAutomation\test-results\.playwright-artifacts-0\838ef911-0d75-4275-b26e-ae154b0fca8f' -> 'C:\Users\FA25-MSSE-0011\Downloads\swag-labs-order-2026-08-19_15-58-33.pdf'
  33 |   'C:/Users/FA25-MSSE-0011/Downloads/' + download.suggestedFilename()
  34 | );
  35 | 
  36 | 
  37 | });
```