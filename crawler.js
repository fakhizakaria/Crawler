// Import and assigne Puppeteer library
const puppeteer = require('puppeteer');


// We create a async function because there is a lot of asynchronous operations between the browser and Puppeteer
async function getArts() {
    const browser = await puppeteer.launch(
        {
            // By default Puppeteer is set up to headless mode(no browser ui).
            headless: false,
            // Fixe the visual lag of the page.
            defaultViewport: null
        }
    );

    // get a new page object (Promise)
    const page = await browser.newPage();

    const url = 'https://paris.craigslist.org/search/ara?purveyor-input=all&hasPic=1';

    await page.goto(url);

    // wait until the css selector apear in the page(Loading).
    await page.waitForTimeout('.result-row');

    /* 
    Inject JavaScript into page with Puppeteer with $$eval method.
    Create list of items and translate  each one.
    */ 

    const results = await page.$$eval('.result-row', arts => {
        return arts.map(art => {
            const properties = {};
            const titleElement = art.querySelector('.result-title');
            properties.title = titleElement.innerText;
            properties.url = titleElement.getAttribute('href');
            const priceElement = art.querySelector('.result-price');
            properties.price = priceElement ? priceElement.innerText : '';
            return properties;
        });
    });

    console.log(results);

   // Close browser
    browser.close();
}

getArts(); 
