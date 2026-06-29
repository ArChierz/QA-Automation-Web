export const ENV = {
    // URL
    baseUrl: "https://www.saucedemo.com/",

    // test data
    users: {
        valid: {
            username: "standard_user",
            password: "secret_sauce",
            firstName: "Zidan",
            lastName: "Ramadhan",
            postalCode: "123"
        },
        invalidUsername: {
            username: "standard_usersss",
            password: "secret_sauce"
        },
        invalidPassword: {
            username: "standard_user",
            password: "secret_sauces"
        },
        lockedOut: {
            username: "locked_out_user",
            password: "secret_sauce"
        },
        problem: {
            username: "problem_user",
            password: "secret_sauce"
        },
        performance: {
            username: "performance_glitch_user",
            password: "secret_sauce"
        },
        error: {
            username: "error_user",
            password: "secret_sauce"
        },
        visual: {
            username: "visual_user",
            password: "secret_sauce"
        },
    },

    // expected value for assertion
    expected: {
        loginSuccessTitle: "Products",
        invalidCredential: "Epic sadface: Username and password do not match any user in this service",
        lockedOutMessage: "Epic sadface: Sorry, this user has been locked out.",
        emptyCredential: "is required",
        cartPageTitle: "Your Cart",
        checkoutOneTitle: "Checkout: Your Information",
        checkoutTwoTitle: "Checkout: Overview",
        checkoutCompleteTitle: "Checkout: Complete!",
        checkoutCompleteMessage: "Thank you for your order!"
    },

    // timeout in ms
    timeouts: {
        implicitWait: 10000,
        explicitWait: 10000,
        pageLoadTimeout: 30000
    }
}

