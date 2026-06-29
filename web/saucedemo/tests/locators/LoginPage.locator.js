import {By} from 'selenium-webdriver';

export const LOGIN_LOCATORS = {
    url:"https://www.saucedemo.com/",

    selectors: {
        usernameInput: By.id('user-name'),
        passwordInput: By.css('input#password.input_error.form_input'),
        loginButton: By.xpath("//input[@id='login-button']"),
        errorMessage: By.xpath("//h3[@data-test='error']"),
        loginSuccessTitle: By.xpath("//span[@data-test='title']")
    }
};

// module.exports = xxx