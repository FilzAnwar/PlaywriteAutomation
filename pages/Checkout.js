import { test } from '../fixtures/testSetup.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';

class Checkout {
    constructor(page) {
        this.page = page;

        this.checkoutButton = page.locator('//*[@id="checkout"]');
        this.infopage = page.locator('//*[@id="header_container"]/div[2]/span');

        this.firstname = page.locator('//*[@id="first-name"]');
        this.lastname = page.locator('//*[@id="last-name"]');
        this.zip = page.locator('//*[@id="postal-code"]');

        this.continueButton = page.locator('//*[@id="continue"]');

        this.overviewpage = page.locator('//*[@id="header_container"]/div[2]/span');

        this.finishButton = page.locator('//*[@id="finish"]');

        this.checkoutEnd = page.locator(
            '//*[@id="header_container"]/div[2]/span'
        );

        this.generatepdf = page.locator(
            '//*[@id="generate-pdf-order"]'
        );
    }

    async checkout(firstName, lastName, postalCode) {

        await test.step('Click checkout button', async () => {
            await this.checkoutButton.click();
        });

        await attachStepScreenshot(
            this.page,
            '01 - Click Checkout Button'
        );

        await test.step('Enter first name', async () => {
            await this.firstname.fill(firstName);
        });

        await attachStepScreenshot(
            this.page,
            '02 - Enter Firstname'
        );

        await test.step('Enter last name', async () => {
            await this.lastname.fill(lastName);
        });

        await attachStepScreenshot(
            this.page,
            '03 - Enter Lastname'
        );

        await test.step('Enter zip code', async () => {
            await this.zip.fill(postalCode);
        });

        await attachStepScreenshot(
            this.page,
            '04 - Enter Zip Code'
        );

        await test.step('Click Continue button', async () => {
            await this.continueButton.click();
        });

        await attachStepScreenshot(
            this.page,
            '05 - Click Continue Button'
        );

        await test.step('Click Finish button', async () => {
            await this.finishButton.click();
        });

        await attachStepScreenshot(
            this.page,
            '06 - Click Finish Button'
        );
    }
}

export default Checkout;