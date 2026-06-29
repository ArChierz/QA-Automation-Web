import LoginPage from "../pages/LoginPage.js";
import InventoryPage from "../pages/InventoryPage.js";
import ScreenshotPage from "../pages/ScreenshotPage.js";
import VisualRegressionHelper from "../helpers/VisualRegressionHelper.js";
import { xbrowser } from "../helpers/DriverFactory.js";
import { expect } from "chai";
import { ENV } from "../../config/env.js";

describe("Saucedemo - Cart Functionality", function(){

    describe("Positive Cart Test", function(){

        let driver;
        let loginPage;
        let inventoryPage;
        let screenshotPage;
        let visualRegression;

        before(async function(){

            driver = await xbrowser(process.env.BROWSER);
    
            // loginPage = new LoginPage(driver);
            inventoryPage = new InventoryPage(driver);
            screenshotPage = new ScreenshotPage(driver);
            visualRegression = new VisualRegressionHelper();
            visualRegression.clearCurrentVisual();

            await inventoryPage.login();

        });

        it("should successfully add an item into cart", async function(){
            const steps = [];
            const visualResults = [];

            const loginTitle = await inventoryPage.getTitlePage();
            steps.push(`1. Verify page title: ${loginTitle}`);
            expect(loginTitle).to.equal(ENV.expected.loginSuccessTitle);

            await screenshotPage.takeFullScreenshot('step1_inventory_page.png');
            if(!visualRegression.hasBaseline('step1_inventory_page.png')){
                
                visualRegression.saveAsBaseline('step1_inventory_page.png');
                console.log("No baseline found. Creating new baseline");
                    
            }
            const vr1 = visualRegression.compareImages('step1_inventory_page.png');
            visualResults.push( {name: 'step1_inventory_page.png', result: vr1});

            
            await inventoryPage.clickAddToCartButton();
            steps.push('2. Click Add to Cart Button');
            
            const badgeCart = await inventoryPage.hasItemInCart();
            expect(badgeCart).to.be.true;
            steps.push(`3. Badge Cart visibility: ${badgeCart}`);
            
            const removeButton = await inventoryPage.hasRemoveButton();
            expect(removeButton).to.be.true;
            steps.push(`4. Remove Button visibility: ${removeButton}`);

            // screenshot and visual regression
            await screenshotPage.takeFullScreenshot('step2_badge-remove-button_inventory-page.png');
            if(!visualRegression.hasBaseline('step2_badge-remove-button_inventory-page.png')){
                
                visualRegression.saveAsBaseline('step2_badge-remove-button_inventory-page.png');
                console.log("No baseline found. Creating new baseline");
                    
            }
            const vr2 = visualRegression.compareImages('step2_badge-remove-button_inventory-page.png');
            visualResults.push( {name: 'step2_badge-remove-button_inventory-page.png', result: vr2});

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
})