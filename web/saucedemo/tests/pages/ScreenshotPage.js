import path from 'path';
import fs from 'fs';
import By from 'selenium-webdriver';
// this is essential to get the __dirname
// src: https://stackoverflow.com/questions/8817423/why-is-dirname-not-defined-in-node-repl
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// since this is helper, the good practice is to put in helpers folder later.
class ScreenshotPage {
    constructor(driver){
        // create the var here to supplied the __dirname
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        this.driver = driver;
        this.screenshotDir = path.join(__dirname, '..','..', 'screenshot', 'visual-current');

    }

    async takeFullScreenshot(filename){
        if(!fs.existsSync(this.screenshotDir)){
            fs.mkdirSync(this.screenshotDir, {recursive: true});
        }

        const screenshotPath = path.join(this.screenshotDir, filename);
        const screenshot = await this.driver.takeScreenshot();
        fs.writeFileSync(screenshotPath, screenshot, 'base64');
        console.log(`Full screenshot saved: ${screenshotPath}`);
        return screenshotPath;
    }

    async takeElementScreenshot(selector, filename){
        

        if(!fs.existsSync(this.screenshotDir)){
            fs.mkdirSync(this.screenshotDir, {recursive: true});
        }

        const element = await this.driver.findElement(By.css(selector));
        const screenshotPath = path.join(this.screenshotDir, filename);
        const screenshot = await element.takeScreenshot(true);
        fs.writeFileSync(screenshotPath, screenshot, 'base64');
        console.log(`Element screenshot saved: ${screenshotPath}`);
        return screenshotPath;
    }
}

export default ScreenshotPage;