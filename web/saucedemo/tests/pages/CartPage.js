import { until } from "selenium-webdriver";
import { CART_LOCATORS } from "../locators/cartPage.locator.js";
import { ENV } from "../../config/env.js";

class CartPage {
    constructor(driver){
        this.driver = driver;
    }

    // use explicit wait for waiting in condition of 'title'
    async getTitlePage(){
        const titleText = await this.driver.wait(until.elementLocated(CART_LOCATORS.selectors.cartTitle), ENV.timeouts.explicitWait);
        
        return await titleText.getText();
    }

    async hasItemInCart(){
        const itemInCart = await this.driver.wait(until.elementLocated(CART_LOCATORS.selectors.itemInCart), ENV.timeouts.explicitWait);
        
        await this.driver.wait(until.elementIsVisible(itemInCart), ENV.timeouts.explicitWait);
        return await itemInCart.isDisplayed();
    }

    async clickCheckout(){
        const checkoutButton = await this.driver.findElement(CART_LOCATORS.selectors.checkoutButton);
        await checkoutButton.click();
    }

}

export default CartPage;