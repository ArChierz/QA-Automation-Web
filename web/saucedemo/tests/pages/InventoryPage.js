import { INVENTORY_LOCATORS } from "../locators/InventoryPage.locator.js";
import { LOGIN_LOCATORS } from "../locators/LoginPage.locator.js";
import LoginPage from "./LoginPage.js";
import { ENV } from "../../config/env.js";
import { until } from "selenium-webdriver";

class InventoryPage {
    constructor(driver){
        this.driver = driver;
        this.loginPage = new LoginPage(this.driver);
    }

    async login(){
        await this.loginPage.open();
        await this.loginPage.enterUsername(ENV.users.valid.username);
        await this.loginPage.enterPassword(ENV.users.valid.password);
        await this.loginPage.clickLoginButton();
    }

    // use explicit wait for waiting in condition of 'title'
    async getTitlePage(){
        const successMessage = await this.driver.wait(until.elementLocated(INVENTORY_LOCATORS.selectors.InventoryTitle), ENV.timeouts.explicitWait);
        return await successMessage.getText();
    }

    async clickAddToCartButton(){
        const clickCartButton = await this.driver.findElement(INVENTORY_LOCATORS.selectors.addToCart);
        await clickCartButton.click();
    }

    async clickShoppingCartButton(){
        const clickShoppingCart = await this.driver.findElement(INVENTORY_LOCATORS.selectors.shoppingCartButton);
        await clickShoppingCart.click();
    }

    async hasRemoveButton(){
        const removeButton = await this.driver.wait(until.elementLocated(INVENTORY_LOCATORS.selectors.removeButton), ENV.timeouts.explicitWait);
        
        await this.driver.wait(until.elementIsVisible(removeButton), ENV.timeouts.explicitWait);

        return await removeButton.isDisplayed();
    }

    async hasItemInCart(){
        const shopCartBadge = await this.driver.wait(until.elementLocated(INVENTORY_LOCATORS.selectors.shopCartBadge, ENV.timeouts.explicitWait));
        
        await this.driver.wait(until.elementIsVisible(shopCartBadge), ENV.timeouts.explicitWait);

        return await shopCartBadge.isDisplayed();
    }

    async addItemIntoCart(){

    }
}

export default InventoryPage;