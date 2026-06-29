import { By } from "selenium-webdriver";

export const CHECKOUT_COMPLETE_LOCATORS = {
    url:"https://www.saucedemo.com/checkout-complete.html",

    selectors: {
        checkoutCompleteTitle: By.xpath("//span[@data-test='title']"),
        completeMessage: By.xpath("//h2[@data-test='complete-header']")
    }
}