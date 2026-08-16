import { test, expect } from '@playwright/test';

import logintestdata from '../testdata/logintestdata.json';
import addtocartdata from '../testdata/addtocartdata.json';

import LoginPage from '../pages/LoginPage';
import AddToCart from '../pages/AddtoCart';


test('Add Product To Cart', async ({ page }) => {

    const login = new LoginPage(page);

    const data = logintestdata.validUsers[0];

    // Login
    await login.gotoURL();
    await login.login(data.username, data.password);

    await expect(login.validmessageLocator)
        .toHaveText(data.message);

    // Add To Cart Page
    const cartpage = new AddToCart(page);

    // Add all products
    for (const product of addtocartdata.products) {
        await cartpage.addtoCart(product.testId);
    }

    // Open Cart
    await cartpage.openCart();

    // Verify all products in Cart
    for (const product of addtocartdata.products) {
        await expect(
            page.locator('.cart_item')
                .filter({ hasText: product.name })
        ).toBeVisible();
    }
});