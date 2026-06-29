import { until } from "selenium-webdriver";
import { CHECKOUT_COMPLETE_LOCATORS } from "../locators/CheckoutComplete.locator.js";
import { ENV } from "../../config/env.js";

class CheckoutComplete{
    constructor(driver){
        this.driver = driver;
    }

    async getTitle(){
        const titleText = await this.driver.wait(until.elementLocated(CHECKOUT_COMPLETE_LOCATORS.selectors.checkoutCompleteTitle), ENV.timeouts.explicitWait);
        return await titleText.getText();
    }

    async getCompleteMessage(){
        const completeMessage = await this.driver.wait(until.elementLocated(CHECKOUT_COMPLETE_LOCATORS.selectors.completeMessage), ENV.timeouts.explicitWait);
        return await completeMessage.getText();
    }
}

export default CheckoutComplete;