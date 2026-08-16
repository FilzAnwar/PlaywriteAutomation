import { test, expect } from '@playwright/test';

import logintestdata from '../testdata/logintestdata.json';
import addtocartdata from '../testdata/addtocartdata.json';
import checkoutdata from '../testdata/checkoutdata.json'; 
import LoginPage from '../pages/LoginPage';
import AddToCart from '../pages/AddtoCart'; // Fixed import name to match constructor
import Checkout from '../pages/Checkout';
import Logout from '../pages/LogoutPage'

test ("pom smoke test", async({page})=>{
 const login=new LoginPage(page);
  const data= logintestdata.validUsers[0]
// login
  await login.gotoURL();
  await login.login(data.username,data.password)
 await expect(login.validmessageLocator)
        .toHaveText(data.message);
// cart
      // CART
const cartpage = new AddToCart(page);
const cartdata = addtocartdata.products[0];

await cartpage.addtoCart(cartdata.testId);
await cartpage.openCart();

// Clean POM assertion without raw page.locator() in the test
await expect(cartpage.getCartItemByName(cartdata.name)).toBeVisible();
        //checkout
        // CHECKOUT
            const checkoutData = checkoutdata.checkoutUsers[0];
        
    const checkout = new Checkout(page);

    await checkout.checkout(
        checkoutData.firstName,
        checkoutData.lastName,
        checkoutData.postalCode
    );


    // VERIFY CHECKOUT COMPLETE
    await expect(checkout.checkoutEnd)
        .toHaveText(checkoutData.message);

        });