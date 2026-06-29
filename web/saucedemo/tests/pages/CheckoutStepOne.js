import { Key, until } from "selenium-webdriver";
import { CHECKOUT_ONE_LOCATORS } from "../locators/CheckoutStepOne.locator.js";
import { ENV } from "../../config/env.js";
import { CHECKOUT_TWO_LOCATORS } from "../locators/CheckoutStepTwo.locator.js";
class CheckoutStepOne {
    constructor(driver){
        this.driver = driver;
    }

    async getTitle(){
        const titleText = await this.driver.wait(until.elementLocated(CHECKOUT_ONE_LOCATORS.selectors.checkoutOneTitle), ENV.timeouts.explicitWait);
        return await titleText.getText();
    }

    async enterFirstName(firstname){
        // await this.driver.sleep(5000);
        const firstNameInput = await this.driver.wait(until.elementLocated(CHECKOUT_ONE_LOCATORS.selectors.firstNameInput), ENV.timeouts.explicitWait);
        // await this.driver.findElement();
        // await firstNameInput.clear();
        // await firstNameInput.click();

        // await firstNameInput.sendKeys(Key.chord(Key.CONTROL,"a"), Key.BACK_SPACE, firstname);



        // await firstNameInput.sendKeys(Key.TAB);

        // await this.verifyInputValue(CHECKOUT_ONE_LOCATORS.selectors.firstNameInput, firstname);
        await firstNameInput.sendKeys(firstname);
    }

    async enterLastName(lastname){
        const lastNameInput = await this.driver.wait(until.elementLocated(CHECKOUT_ONE_LOCATORS.selectors.lastNameInput), ENV.timeouts.explicitWait);
        // await lastNameInput.click();
        // // await this.driver.findElement();
        // // await lastNameInput.clear();
        // await lastNameInput.sendKeys(Key.chord(Key.CONTROL,"a"), Key.BACK_SPACE, lastname);

        // await lastNameInput.sendKeys(Key.TAB);

        // await this.verifyInputValue(CHECKOUT_ONE_LOCATORS.selectors.lastNameInput, lastname);
        await lastNameInput.sendKeys(lastname);
    }

    async enterPostalCode(postalcode){
        const postalCodeInput = await this.driver.wait(until.elementLocated(CHECKOUT_ONE_LOCATORS.selectors.postalCodeInput), ENV.timeouts.explicitWait);
        // await postalCodeInput.click();
        // await postalCodeInput.sendKeys(Key.chord(Key.CONTROL,"a"), Key.BACK_SPACE, postalcode);

        // await postalCodeInput.sendKeys(Key.TAB);

        // await this.verifyInputValue(CHECKOUT_ONE_LOCATORS.selectors.postalCodeInput, postalcode);
        // this.driver.findElement();
        // await postalCodeInput.clear();
        await postalCodeInput.sendKeys(postalcode);
    }

    async clickContinueButton(){
        const continueButton = await this.driver.findElement(CHECKOUT_ONE_LOCATORS.selectors.continueButton);
        await continueButton.click();

        await this.driver.wait(until.elementLocated(CHECKOUT_TWO_LOCATORS.selectors.checkoutTwoTitle), ENV.timeouts.explicitWait);
        
    }

//     async verifyInputValue(inputLocator, expectedValue) {
//     // This waits until the DOM attribute 'value' matches the expected text
//     await this.driver.wait(async () => {
//         const input = await this.driver.findElement(inputLocator);
//         const actualValue = await input.getAttribute('value');
//         return actualValue === expectedValue;
//     }, ENV.timeouts.explicitWait, `Input failed to update to: ${expectedValue}`);
// }


}

export default CheckoutStepOne;