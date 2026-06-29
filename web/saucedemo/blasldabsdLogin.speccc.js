import { Builder, By, until } from 'selenium-webdriver';
// native nodejs
// const assert = require('assert');
// choose this for qquick / basic debugging that dont want to manaaage external package and bloat the size. highly technical and basic error message
import {expect} from "chai";
// use Chai for more professional env. provide BDD style, superior error report

import chrome from 'selenium-webdriver/chrome.js';
import firefox from 'selenium-webdriver/firefox.js';

const baseURL = "https://www.saucedemo.com/";

// const optionsArgs = ["--headless=new","--window-size=1920,1080"];

async function login(driver, username, password){
    let inputUsername = await driver.findElement(By.id('user-name'));
    let inputPassword = await driver.findElement(By.css('input#password.input_error.form_input'));
    let buttonLogin = await driver.findElement(By.xpath("//input[@id='login-button']"));
    await inputUsername.sendKeys(username);
    await inputPassword.sendKeys(password);
    await buttonLogin.click();
}

async function xbrowser(browser){

    let builder = new Builder().forBrowser(browser);
    const configOptions = getBrowserOptions(browser);

    if(browser === 'chrome'){

        // builder.forBrowser(browser);
        builder.setChromeOptions(configOptions);
        
    } else if (browser === 'firefox'){
        
        // builder.forBrowser(browser);
        builder.setFirefoxOptions(configOptions);

    } else {

        throw new Error("undefined");
        
    }
    // di sini pake await untuk nunggu build
    let driver = await builder.build();
    await driver.get(baseURL);  

    return driver;

}

function getBrowserOptions(browser){
    let options;

    if(browser === 'chrome'){
        options = new chrome.Options();
        options.addArguments("--headless=new","--window-size=1920,1080");

    } else if (browser === 'firefox'){
        options = new firefox.Options(); 
        options.addArguments("--headless","--window-size=1920,1080");
    }

    return options;
}

    
describe("Saucedemo - Login Functionality", function(){
    
    let driver;
    

    beforeEach(async function(){

        driver = await xbrowser(process.env.BROWSER || 'chrome');
        
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


