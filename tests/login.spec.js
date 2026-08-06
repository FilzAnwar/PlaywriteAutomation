import {test, expect} from '@playwright/test'

// valid user name and password 
test('login test case' , async({page})=>{
await page.goto('https://www.saucedemo.com/');
await page.fill('#user-name', 'standard_user');
await page.fill('#password' ,'secret_sauce');
await page.click('#login-button');

 await expect(page.locator('#header_container > div.header_secondary_container > span')).toHaveText("Products");

});

// invalid user name and valid password 

test('invalid username login test case' , async({page})=>{
await page.goto('https://www.saucedemo.com/');
await page.fill('#user-name', 'standarduser');
await page.fill('#password' ,'secret_sauce');
await page.click('#login-button');

 await expect(page.locator('#login_button_container > div > form > div.error-message-container.error > h3')).toHaveText("Epic sadface: Username and password do not match any user in this service");

});

//  valid username and invalid password 
test('invalid password login test case' , async({page})=>{
await page.goto('https://www.saucedemo.com/');
await page.fill('#user-name', 'standard_user');
await page.fill('#password' ,'secretsauce');
await page.click('#login-button');

 await expect(page.locator('//*[@id="login_button_container"]/div/form/div[3]/h3')).toHaveText("Epic sadface: Username and password do not match any user in this service");

});


//  invalid username and invalid password 
test('invalid username and  password login test case' , async({page})=>{
await page.goto('https://www.saucedemo.com/');
await page.fill('#user-name', 'standarduser');
await page.fill('#password' ,'secretsauce');
await page.click('#login-button');

 await expect(page.locator('//*[@id="login_button_container"]/div/form/div[3]/h3')).toHaveText("Epic sadface: Username and password do not match any user in this service");

});

//  empty username and  password 
test('empty password and username login test case' , async({page})=>{
await page.goto('https://www.saucedemo.com/');
await page.fill('#user-name', '');
await page.fill('#password' ,'');
await page.click('#login-button');

 await expect(page.locator('//*[@id="login_button_container"]/div/form/div[3]/h3')).toHaveText("Epic sadface: Username is required");

});