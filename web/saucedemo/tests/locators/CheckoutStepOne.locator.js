import { By } from "selenium-webdriver";

export const CHECKOUT_ONE_LOCATORS = {
    url:"https://www.saucedemo.com/checkout-step-one.html",

    selectors: {
        checkoutOneTitle: By.xpath("//span[@data-test='title']"),
        firstNameInput: By.id('first-name'),
        lastNameInput: By.id('last-name'),
        postalCodeInput: By.id('postal-code'),
        continueButton: By.id('continue')
    }
}