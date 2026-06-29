import LoginPage from "../pages/LoginPage.js";
import InventoryPage from "../pages/InventoryPage.js";
import { BROWSER } from "../../config/browser.js";
import { ENV } from "../../config/env.js";
import { xbrowser } from "../helpers/DriverFactory.js";
import { expect } from "chai";
import ScreenshotPage from "../pages/ScreenshotPage.js";
import VisualRegressionHelper from "../helpers/VisualRegressionHelper.js";

describe("Saucedemo - Login Functionality", function(){
    
    describe("Positive Login Test", function(){

        let driver;
        let loginPage;
        let inventoryPage;
        let screenshotPage;
        let visualRegression;
    
        before(async function(){
    
            driver = await xbrowser(process.env.BROWSER);
    
            loginPage = new LoginPage(driver);
            inventoryPage = new InventoryPage(driver);
            screenshotPage = new ScreenshotPage(driver);
            visualRegression = new VisualRegressionHelper();
            visualRegression.clearCurrentVisual();
            
            
        });
    
        it("should login successfully with valid credentials", async function(){
            const steps = [];
            const visualResults = [];
    
            await loginPage.open();
            // best practice for next project, never put steps.push here but create another helper for cleaner reporting format
            steps.push('1. Open login page (https://www.saucedemo.com/)');
            await screenshotPage.takeFullScreenshot('step1_login_page.png');

            if(!visualRegression.hasBaseline('step1_login_page.png')){
                
                visualRegression.saveAsBaseline('step1_login_page.png');
                console.log("No baseline found. Creating new baseline");
                
                
            }
            const vr1 = visualRegression.compareImages('step1_login_page.png');
            visualResults.push( {name: 'step1_login_page.png', result: vr1});
            
            await loginPage.enterUsername(ENV.users.valid.username);
            steps.push(`2. Enter username:${ENV.users.valid.username}`);
            
            await loginPage.enterPassword(ENV.users.valid.password);
            steps.push(`3. Enter password:${ENV.users.valid.password.replace(/./g, '*')}`);
            
            await loginPage.clickLoginButton();
            // await screenshotPage.takeFullScreenshot('step4_after_login.png');
            steps.push('4. click Login button');
            
            // const errorMessage = await loginPage.getErrorMessage();
            
            const loginTitle = await inventoryPage.getTitlePage();
            steps.push(`5. Verify page title: ${loginTitle}`);
            expect(loginTitle).to.equal(ENV.expected.loginSuccessTitle);

            await screenshotPage.takeFullScreenshot('step2_validate_page_title.png');

            if(!visualRegression.hasBaseline('step2_validate_page_title.png')){
                
                visualRegression.saveAsBaseline('step2_validate_page_title.png');
                console.log("No baseline found. Creating new baseline");
                
                
            }

            // visualRegression.saveAsBaseline('step2_validate_page_title.png');
            const vr2 = visualRegression.compareImages('step2_validate_page_title.png');
            visualResults.push( {name: 'step2_validate_page_title.png', result: vr2});

    
            // let spanTitleText = await driver.findElement(By.xpath("//span[@data-test='title']")).getText();
            // expect(spanTitleText, "login gagal").to.equal("Products");

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

    describe("Negative Login Test", function(){

        let driver;
        let loginPage;
        let screenshotPage;
        let visualRegression;

        beforeEach(async function(){

            driver = await xbrowser(process.env.BROWSER);
    
            loginPage = new LoginPage(driver);
            screenshotPage = new ScreenshotPage(driver);
            visualRegression = new VisualRegressionHelper();
            // visualRegression.clearCurrentVisual();
        })

        it("should fail to login with an invalid username", async function () {

            const steps = [];
            const visualResults = [];
    
            await loginPage.open();

            steps.push('1. Open login page (https://www.saucedemo.com/)');
            await screenshotPage.takeFullScreenshot('step1_login_page.png');

            if(!visualRegression.hasBaseline('step1_login_page.png')){
                
                visualRegression.saveAsBaseline('step1_login_page.png');
                console.log("No baseline found. Creating new baseline");
                
                
            }

            const vr1 = visualRegression.compareImages('step1_login_page.png');
            visualResults.push( {name: 'step1_login_page.png', result: vr1});

            await loginPage.enterUsername(ENV.users.invalidUsername.username);
            steps.push(`2. Enter username:${ENV.users.invalidUsername.username}`);

            await loginPage.enterPassword(ENV.users.invalidUsername.password);
            steps.push(`3. Enter password:${ENV.users.invalidUsername.password.replace(/./g, '*')}`);

            await loginPage.clickLoginButton();
            steps.push('4. click Login button');

            const errorMessage = await loginPage.getErrorMessage();
            steps.push(`5. Verify error message: ${errorMessage}`);

            expect(errorMessage).to.equal(ENV.expected.invalidCredential);

            await screenshotPage.takeFullScreenshot('step2_validate_error_message.png');

            if(!visualRegression.hasBaseline('step2_validate_error_message.png')){
                
                visualRegression.saveAsBaseline('step2_validate_error_message.png');
                console.log("No baseline found. Creating new baseline");
                
                
            }

            const vr2 = visualRegression.compareImages('step2_validate_error_message.png');
            visualResults.push( {name: 'step2_validate_error_message.png', result: vr2});

    
            // let spanTitleText = await driver.findElement(By.xpath("//span[@data-test='title']")).getText();
            // expect(spanTitleText, "login gagal").to.equal("Products");

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

        it("should fail to login with an invalid password", async function () {
            const steps = [];
            const visualResults = [];
    
            await loginPage.open();

            steps.push('1. Open login page (https://www.saucedemo.com/)');
            await screenshotPage.takeFullScreenshot('step1_login_page.png');

            if(!visualRegression.hasBaseline('step1_login_page.png')){
                
                visualRegression.saveAsBaseline('step1_login_page.png');
                console.log("No baseline found. Creating new baseline");
                
                
            }

            const vr1 = visualRegression.compareImages('step1_login_page.png');
            visualResults.push( {name: 'step1_login_page.png', result: vr1});

            await loginPage.enterUsername(ENV.users.invalidPassword.username);
            steps.push(`2. Enter username:${ENV.users.invalidPassword.username}`);

            await loginPage.enterPassword(ENV.users.invalidPassword.password);
            steps.push(`3. Enter password:${ENV.users.invalidPassword.password.replace(/./g, '*')}`);

            await loginPage.clickLoginButton();
            steps.push('4. click Login button');

            const errorMessage = await loginPage.getErrorMessage();
            steps.push(`5. Verify error message: ${errorMessage}`);

            expect(errorMessage).to.equal(ENV.expected.invalidCredential);

            await screenshotPage.takeFullScreenshot('step2-pw_validate_error_message.png');

            if(!visualRegression.hasBaseline('step2-pw_validate_error_message.png')){
                
                visualRegression.saveAsBaseline('step2-pw_validate_error_message.png');
                console.log("No baseline found. Creating new baseline");
                
                
            }

            const vr2 = visualRegression.compareImages('step2-pw_validate_error_message.png');
            visualResults.push( {name: 'step2-pw_validate_error_message.png', result: vr2});

    
            // let spanTitleText = await driver.findElement(By.xpath("//span[@data-test='title']")).getText();
            // expect(spanTitleText, "login gagal").to.equal("Products");

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

        it("should fail to login with a locked out user", async function () {
            const steps = [];
            const visualResults = [];
    
            await loginPage.open();

            steps.push('1. Open login page (https://www.saucedemo.com/)');
            await screenshotPage.takeFullScreenshot('step1_login_page.png');

            if(!visualRegression.hasBaseline('step1_login_page.png')){
                
                visualRegression.saveAsBaseline('step1_login_page.png');
                console.log("No baseline found. Creating new baseline");
                
                
            }

            const vr1 = visualRegression.compareImages('step1_login_page.png');
            visualResults.push( {name: 'step1_login_page.png', result: vr1});

            await loginPage.enterUsername(ENV.users.lockedOut.username);
            steps.push(`2. Enter username:${ENV.users.lockedOut.username}`);

            await loginPage.enterPassword(ENV.users.lockedOut.password);
            steps.push(`3. Enter password:${ENV.users.lockedOut.password.replace(/./g, '*')}`);

            await loginPage.clickLoginButton();
            steps.push('4. click Login button');

            const errorMessage = await loginPage.getErrorMessage();
            steps.push(`5. Verify error message: ${errorMessage}`);

            expect(errorMessage).to.equal(ENV.expected.lockedOutMessage);

            await screenshotPage.takeFullScreenshot('step2-lckdout_validate_error_message.png');

            if(!visualRegression.hasBaseline('step2-lckdout_validate_error_message.png')){
                
                visualRegression.saveAsBaseline('step2-lckdout_validate_error_message.png');
                console.log("No baseline found. Creating new baseline");
                
                
            }

            const vr2 = visualRegression.compareImages('step2-lckdout_validate_error_message.png');
            visualResults.push( {name: 'step2-lckdout_validate_error_message.png', result: vr2});

    
            // let spanTitleText = await driver.findElement(By.xpath("//span[@data-test='title']")).getText();
            // expect(spanTitleText, "login gagal").to.equal("Products");

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

        afterEach(async function(){
            
            if(driver){
                await driver.quit();
            }
        });

    });
    
    
});
