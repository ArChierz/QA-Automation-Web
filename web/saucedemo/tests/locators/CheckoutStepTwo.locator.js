import { By } from "selenium-webdriver";

export const CHECKOUT_TWO_LOCATORS = {
    url:"https://www.saucedemo.com/checkout-step-two.html",

    selectors: {
        checkoutTwoTitle: By.xpath("//span[@data-test='title']"),
        itemInCart: By.xpath("//div[@data-test='inventory-item']"),
        // continueButton: By.id('continue'),
        totalValue: By.xpath("//span[@data-test='total-label']"),
        finishButton: By.id('finish')
    }
}