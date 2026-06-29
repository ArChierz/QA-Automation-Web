import {By} from 'selenium-webdriver';

export const INVENTORY_LOCATORS = {
    url:"https://www.saucedemo.com/inventory.html",

    selectors: {
        InventoryTitle: By.xpath("//span[@data-test='title']"),
        addToCart: By.id("add-to-cart-sauce-labs-backpack"),
        shoppingCartButton: By.xpath("//a[@data-test='shopping-cart-link']"),
        removeButton: By.id('remove-sauce-labs-backpack'), //use explicitwait
        shopCartBadge: By.xpath("//span[@data-test='shopping-cart-badge']") //use explicitwait
        
    }
};
