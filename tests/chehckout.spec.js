import { test, expect } from '@playwright/test';

import logintestdata from '../testdata/logintestdata.json';
import addtocartdata from '../testdata/addtocartdata.json';
import LoginPage from '../pages/loginpage';
import AddToCart from '../pages/AddtoCart';
import Checkout from '../pages/Checkout';
import checkoutdata from '../testdata/addtocartdata.json';


test('Checkout', async ({ page }) => {

    const login = new LoginPage(page);

    const loginData = logintestdata.validUsers[0];
    const checkoutData = checkoutdata.checkoutUsers[0];


    // LOGIN
    await login.gotoURL();

    await login.login(
        loginData.username,
        loginData.password
    );

    await expect(login.validmessageLocator)
        .toHaveText(loginData.message);


    // ADD TO CART
    const cartpage = new AddToCart(page);

    for (const product of addtocartdata.products) {

        await cartpage.addtoCart(product.testId);

    }


    // OPEN CART
    await cartpage.openCart();


    // VERIFY PRODUCTS IN CART
    for (const product of addtocartdata.products) {

        await expect(
            page.locator('.cart_item')
                .filter({ hasText: product.name })
        ).toBeVisible();

    }


    // CHECKOUT
    const checkout = new Checkout(page);

    await checkout.checkout(
        checkoutData.firstName,
        checkoutData.lastName,
        checkoutData.postalCode
    );


    // VERIFY CHECKOUT COMPLETE
    await expect(checkout.checkoutPage)
        .toHaveText('Thank you for your order!');
});