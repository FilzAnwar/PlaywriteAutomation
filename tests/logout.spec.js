import {test, expect} from '@playwright/test'
import LogoutPage from '../pages/LogoutPage'
import logoutdata from "../testdata/logoutdata.json" 

import logintestdata from '../testdata/logintestdata.json';

import LoginPage from '../pages/LoginPage';


test('Add Product To Cart', async ({ page }) => {

    const login = new LoginPage(page);
    const logout = new LogoutPage(page);

    const data = logintestdata.validUsers[0];
    const data2 = logoutdata.MessageLogout[0];

    // Login
    await login.gotoURL();
    await login.login(data.username, data.password);

    await expect(login.validmessageLocator)
        .toHaveText(data.message);

    // LOGOUt Page
    
    await logout.logout()
     await expect(logout.message)
        .toHaveText(data2.messageLogout);


  

});