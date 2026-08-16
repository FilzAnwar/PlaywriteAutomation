import {test, expect} from '@playwright/test'
import logintestdata from '../testdata/logintestdata.json'
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';



test('Home page inventory', async ({page})=>{
    const login = new LoginPage(page); 
//selecting first dataset from JSON 
const data = logintestdata.validUsers[0]; 
await login.gotoURL(); 
await login.login(data.username, data.password); 
await expect(login.validmessageLocator).toHaveText(data.message);
const homePage= new HomePage(page)
// const data= hometestdata.messages[0]
await homePage.home()
await expect(homePage.expectSortZtoA).toBeVisible();
   await expect(homePage.sortButton).toHaveValue('za');

//  await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();


})