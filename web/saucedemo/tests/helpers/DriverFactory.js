import { BROWSER } from "../../config/browser.js";
import { ENV } from "../../config/env.js";
import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import firefox from 'selenium-webdriver/firefox.js';

export async function xbrowser(browser){

    let builder = new Builder().forBrowser(browser);
    const configOptions = getBrowserOptions(browser);

    switch(browser){
        case 'chrome':
            builder.setChromeOptions(configOptions);
            break;
        case 'firefox':
            builder.setFirefoxOptions(configOptions);
            break;
        default:
            builder.setChromeOptions(configOptions);
            break;

    }

    // if(browser === 'chrome'){

    //     // builder.forBrowser(browser);

        
    // } else if (browser === 'firefox'){
        
    //     // builder.forBrowser(browser);

    // } else {

    //     throw new Error("undefined");
        
    // }

    // di sini pake await untuk nunggu build
    let driver = await builder.build();
    await driver.get(ENV.baseUrl);  

    return driver;

}

function getBrowserOptions(browser){
    let options;

    if(browser === BROWSER.type.chrome.name){
        options = new chrome.Options();
        options.addArguments(...BROWSER.type.chrome.options.args);
        options.setUserPreferences({
            "credentials_enable_service": false,
            "profile.password_manager_enabled": false
        });

    } else if (browser === BROWSER.type.firefox.name){
        options = new firefox.Options(); 
        options.addArguments(...BROWSER.type.firefox.options.args);
        options.setPreference("signon.rememberSignons", false);
        options.setPreference("signon.formlessCapture.enabled", false);
        options.setPreference("dom.forms.autocomplete.formautofill", false);
    }

    return options;
}