describe.skip("Saucedemo - Product Sorting Functionality", function(){
        let driver;
        
    
        before(async function(){
            
            driver = await xbrowser(process.env.BROWSER || 'chrome');

            await login(driver, 'standard_user', 'secret_sauce');
            
        });

        // in desktop mode the filter visible meanwhille it broken when put into mobile

        it.skip("should display 'Name (A to Z)' as the default selected option", async function(){
            
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