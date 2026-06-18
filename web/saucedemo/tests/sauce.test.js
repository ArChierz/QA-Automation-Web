import { Builder, By, until } from 'selenium-webdriver';
// native nodejs
// const assert = require('assert');
// choose this for qquick / basic debugging that dont want to manaaage external package and bloat the size. highly technical and basic error message
import {expect} from "chai";
// use Chai for more professional env. provide BDD style, superior error report

const baseURL = "https://www.saucedemo.com/";

async function login(driver, username, password){
    let inputUsername = await driver.findElement(By.id('user-name'));
    let inputPassword = await driver.findElement(By.css('input#password.input_error.form_input'));
    let buttonLogin = await driver.findElement(By.xpath("//input[@id='login-button']"));
    await inputUsername.sendKeys(username);
    await inputPassword.sendKeys(password);
    await buttonLogin.click();
}

describe("Saucedemo UI Web Automation", function(){
    
    describe("Login Functionality", function(){
        
        let driver;
    
        beforeEach(async function(){
            
            driver = await new Builder().forBrowser('chrome').build();
            await driver.get(baseURL);  
            
        });

        it("should login successfully with valid credentials", async function(){
            
            await login(driver, 'standard_user', 'secret_sauce');
            let spanTitleText = await driver.findElement(By.xpath("//span[@data-test='title']")).getText();
            expect(spanTitleText, "login gagal").to.equal("Products");
        });

        it("should fail to login with an invalid password", async function () {
            await login(driver, 'standard_user', 'bukan_sauce');
            let errorText = await driver.findElement(By.xpath("//h3[@data-test='error']")).getText();
            expect(errorText, "login berhasil").to.equal("Epic sadface: Username and password do not match any user in this service");
        })

        afterEach(async function(){

            if(driver){
                await driver.quit();
            }
        });

    });

    describe("Product Sorting Functionality", function(){
        let driver;
    
        before(async function(){
            
            driver = await new Builder().forBrowser('chrome').build();
            await driver.get(baseURL);  
            await login(driver, 'standard_user', 'secret_sauce');
            
        });

        it("should display 'Name (A to Z)' ass the default selected option", async function(){
            
            let visibleSpan = await driver.findElement(By.xpath("//span[@data-test='active-option']")).getText();
            expect(visibleSpan, "error tidak ada elemen").to.equal("Name (A to Z)");
        });

        it("should sort products from Z to A when selected", async function(){
            
            let selectFilter = await driver.findElement(By.xpath("//select[@data-test='product-sort-container']")).click();
            let selectOption = await driver.findElement(By.xpath("//option[@value='za']")).click();
            let visibleSpan = await driver.findElement(By.xpath("//span[@data-test='active-option']")).getText();
            // ambil dari parent ke child di list pertama
            let visibleProduct = await driver.findElement(By.xpath("(//div[@data-test='inventory-item'])[1]//div[contains(text(), 'Test.allTheThings() T-Shirt (Red)')]")).getText();
            expect(visibleSpan, "error tidak ada elemen").to.equal("Name (Z to A)");
            expect(visibleProduct, "error tidak ada elemen").to.equal("Test.allTheThings() T-Shirt (Red)");
            
            // expect(visibleSelect, "error tidak ada elemen").to.equal("az");
        });

        it("should sort products from A to Z when selected", async function(){
            
            let selectFilter = await driver.findElement(By.xpath("//select[@data-test='product-sort-container']")).click();
            let selectOption = await driver.findElement(By.xpath("//option[@value='az']")).click();
            let visibleSpan = await driver.findElement(By.xpath("//span[@data-test='active-option']")).getText();
            // ambil dari parent ke child di list pertama
            let visibleProduct = await driver.findElement(By.xpath("(//div[@data-test='inventory-item'])[1]//div[contains(text(), 'Sauce Labs Backpack')]")).getText();
            expect(visibleSpan, "error tidak ada elemen").to.equal("Name (A to Z)");
            expect(visibleProduct, "error tidak ada elemen").to.equal("Sauce Labs Backpack");
            // expect(visibleSelect, "error tidak ada elemen").to.equal("az");
        });


        after(async function(){

            if(driver){
                await driver.quit();
            }
        });
    })
});

