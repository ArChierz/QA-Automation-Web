import { xbrowser } from "../helpers/DriverFactory.js";
import { ENV } from "../../config/env.js";
import { expect } from "chai";
import InventoryPage from "../pages/InventoryPage.js";
import ScreenshotPage from "../pages/ScreenshotPage.js";
import VisualRegressionHelper from "../helpers/VisualRegressionHelper.js";
import CartPage from "../pages/CartPage.js";
import CheckoutStepOne from "../pages/CheckoutStepOne.js";
import CheckoutStepTwo from "../pages/CheckoutStepTwo.js";
import CheckoutComplete from "../pages/CheckoutComplete.js";

describe("Saucedemo - E2E Checkout Functionality", function(){

    describe("Positive Checkout Test", function(){
        let driver;
        let loginPage;
        let inventoryPage;
        let screenshotPage;
        let visualRegression;
        let cartPage;
        let checkoutStepOne;
        let checkoutStepTwo;
        let checkoutComplete;

        before(async function(){

            driver = await xbrowser(process.env.BROWSER);
    
            // loginPage = new LoginPage(driver);
            inventoryPage = new InventoryPage(driver);
            screenshotPage = new ScreenshotPage(driver);
            cartPage = new CartPage(driver);
            checkoutStepOne = new CheckoutStepOne(driver);
            checkoutStepTwo = new CheckoutStepTwo(driver);
            checkoutComplete = new CheckoutComplete(driver);

            visualRegression = new VisualRegressionHelper();
            // visualRegression.clearCurrentVisual();

            await inventoryPage.login();

        });

        it("should successfully checkout an item", async function(){

            const steps = [];
            const visualResults = [];

            await inventoryPage.clickAddToCartButton();
            steps.push('1. Click Add to Cart Button');

            await screenshotPage.takeFullScreenshot('step1_add_to_chart.png');

            if(!visualRegression.hasBaseline('step1_add_to_chart.png')){
                
                visualRegression.saveAsBaseline('step1_add_to_chart.png');
                console.log("No baseline found. Creating new baseline");
                
                
            }
            const vr1 = visualRegression.compareImages('step1_add_to_chart.png');
            visualResults.push( {name: 'step1_add_to_chart.png', result: vr1});
            
            await inventoryPage.clickShoppingCartButton();
            steps.push('2. Click Shopping Cart Button');

            await screenshotPage.takeFullScreenshot('step2_cart_page.png');

            if(!visualRegression.hasBaseline('step2_cart_page.png')){
                
                visualRegression.saveAsBaseline('step2_cart_page.png');
                console.log("No baseline found. Creating new baseline");
                
                
            }
            const vr2 = visualRegression.compareImages('step2_cart_page.png');
            visualResults.push( {name: 'step2_cart_page.png', result: vr2});
            
            const cartTitle = await cartPage.getTitlePage();
            expect(cartTitle).to.equal(ENV.expected.cartPageTitle);
            steps.push(`3. Cart Page title: ${cartTitle}`);
            
            const cartItem = await cartPage.hasItemInCart();
            expect(cartItem).to.be.true;
            steps.push(`4. Cart Item Availability: ${cartItem}`);
            
            await cartPage.clickCheckout();
            steps.push('5. Click Checkout Button');

            const checkout1Title = await checkoutStepOne.getTitle();
            expect(checkout1Title).to.equal(ENV.expected.checkoutOneTitle);
            steps.push(`6. Checkout One Page title: ${checkout1Title}`);
            
            await checkoutStepOne.enterFirstName(ENV.users.valid.firstName);
            steps.push(`7. Input first name: ${ENV.users.valid.firstName}`);
            
            await checkoutStepOne.enterLastName(ENV.users.valid.lastName);
            steps.push(`8. Input last name: ${ENV.users.valid.lastName}`);
            
            await checkoutStepOne.enterPostalCode(ENV.users.valid.postalCode);
            steps.push(`9. Input ZIP/Postal Code: ${ENV.users.valid.postalCode}`);

            await screenshotPage.takeFullScreenshot('step3_checkout_one.png');

            if(!visualRegression.hasBaseline('step3_checkout_one.png')){
                
                visualRegression.saveAsBaseline('step3_checkout_one.png');
                console.log("No baseline found. Creating new baseline");
                
                
            }
            const vr3 = visualRegression.compareImages('step3_checkout_one.png');
            visualResults.push( {name: 'step3_checkout_one.png', result: vr3});
            
            await checkoutStepOne.clickContinueButton();
            steps.push('10. Click Continue Button');

            
            const checkout2Title = await checkoutStepTwo.getTitle();
            expect(checkout2Title).to.equal(ENV.expected.checkoutTwoTitle);
            steps.push(`11. Checkout Two Page title: ${checkout2Title}`);
            
            const cartItemCheckout = await checkoutStepTwo.hasItemInCart();
            expect(cartItemCheckout).to.be.true;
            steps.push(`12. Checkout Cart Item Availability: ${cartItemCheckout}`);

            await screenshotPage.takeFullScreenshot('step4_checkout_two.png');

            if(!visualRegression.hasBaseline('step4_checkout_two.png')){
                
                visualRegression.saveAsBaseline('step4_checkout_two.png');
                console.log("No baseline found. Creating new baseline");
                
                
            }
            const vr4 = visualRegression.compareImages('step4_checkout_two.png');
            visualResults.push( {name: 'step4_checkout_two.png', result: vr4});
            
            await checkoutStepTwo.clickFinishButton();
            steps.push('13. Click Finish Button');

            const checkoutCompleteTitle = await checkoutComplete.getTitle();
            expect(checkoutCompleteTitle).to.equal(ENV.expected.checkoutCompleteTitle);
            steps.push(`14. Checkout Complete Page title: ${checkoutCompleteTitle}`);
            
            const checkoutCompleteMessage = await checkoutComplete.getCompleteMessage();
            expect(checkoutCompleteMessage).to.be.equal(ENV.expected.checkoutCompleteMessage)
            steps.push(`15. Checkout Complete Page Message: ${checkoutCompleteMessage}`);

            await screenshotPage.takeFullScreenshot('step5_checkout_complete.png');

            if(!visualRegression.hasBaseline('step5_checkout_complete.png')){
                
                visualRegression.saveAsBaseline('step5_checkout_complete.png');
                console.log("No baseline found. Creating new baseline");
                
                
            }
            const vr5 = visualRegression.compareImages('step5_checkout_complete.png');
            visualResults.push( {name: 'step5_checkout_complete.png', result: vr5});
            
            steps.forEach(a => {
                console.log(`${a}`);
            
            });

            visualResults.forEach(vr => {
                if(!vr.result.hasBaseline){
                    console.log(` [NEW] ${vr.name} - Baseline Created`);
                } else if (vr.result.match){
                    console.log(` [PASS] ${vr.name} - Match ${vr.result.matchPercentage}`)
                } else {
                    console.log(` [FAIL] ${vr.name} - Match ${vr.result.matchPercentage}`)
                    
                }
            });

        });

        after(async function(){
            if(driver){
                await driver.quit();
            }
        });
    });

});