import { By } from "selenium-webdriver";

export const CART_LOCATORS = {
    url: "https://www.saucedemo.com/cart.html",

    selectors: {
        cartTitle: By.xpath("//span[@data-test='title']"),
        itemInCart: By.xpath("//div[@data-test='inventory-item']"),
        checkoutButton: By.id("checkout")
    }
}