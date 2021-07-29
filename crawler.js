const puppeteer = require('puppeteer');


async function getArts() {
    const browser = await puppeteer.launch(
        {
            headless: false,
            defaultViewport: null
        }
    );

    const page = await browser.newPage();

    const url = 'https://paris.craigslist.org/search/ara?purveyor-input=all&hasPic=1';

    await page.goto(url);

    await page.waitForTimeout('.result-row');

    const results = await page.$$eval('.result-row', rows =>{
        return rows.map(row => {
            const properties = {};
            const titleElement = row.querySelector('.result-title');
            properties.title = titleElement.innerText;
            properties.url = titleElement.getAttribute('href');
            return properties;
        });
    });

    console.log(results);
}

getArts(); 