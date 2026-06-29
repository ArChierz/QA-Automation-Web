import { until } from "selenium-webdriver";
import { LOGIN_LOCATORS } from "../locators/LoginPage.locator.js";
import { ENV } from "../../config/env.js";

class LoginPage {
    constructor(driver){
        this.driver = driver;

    }

    async open(){
        await this.driver.get(LOGIN_LOCATORS.url);
    }

    async enterUsername(username){
        const usernameInput = await this.driver.findElement(LOGIN_LOCATORS.selectors.usernameInput);
        await usernameInput.sendKeys(username);
    }

    async enterPassword(password){
        const passwordInput = await this.driver.findElement(LOGIN_LOCATORS.selectors.passwordInput);
        await passwordInput.sendKeys(password);
    }

    async clickLoginButton(){
        const loginButton = await this.driver.findElement(LOGIN_LOCATORS.selectors.loginButton);
        await loginButton.click();
    }

    // use explicit wait for waiting in condition of 'error message'
    async getErrorMessage(){
        const errorMessage = await this.driver.wait(until.elementLocated(LOGIN_LOCATORS.selectors.errorMessage), ENV.timeouts.explicitWait);
        return await errorMessage.getText();
    }

}

export default LoginPage;