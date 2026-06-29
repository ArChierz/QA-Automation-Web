import { until } from "selenium-webdriver";
import { CHECKOUT_TWO_LOCATORS } from "../locators/CheckoutStepTwo.locator.js";
import { ENV } from "../../config/env.js";

class CheckoutStepTwo{
    constructor(driver){
        this.driver = driver;
    }

    async getTitle(){
        const titleText = await this.driver.wait(until.elementLocated(CHECKOUT_TWO_LOCATORS.selectors.checkoutTwoTitle), ENV.timeouts.explicitWait);
        return await titleText.getText();
    }

    async hasItemInCart(){
        const itemInCart = await this.driver.wait(until.elementLocated(CHECKOUT_TWO_LOCATORS.selectors.itemInCart), ENV.timeouts.explicitWait);
        
        await this.driver.wait(until.elementIsVisible(itemInCart), ENV.timeouts.explicitWait);
        return await itemInCart.isDisplayed();
    }

    async clickFinishButton(){
        const finishButton = await this.driver.findElement(CHECKOUT_TWO_LOCATORS.selectors.finishButton);
        await finishButton.click();
    }

}

export default CheckoutStepTwo;