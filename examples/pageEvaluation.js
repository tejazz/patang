// example: Page Evaluation
// - Pass page object from puppeteer and the platform concerned
const puppeteer = require('puppeteer');
const { evaluateProductDetails } = require('../functions/pageEvaluator');

let exampleFlpktUrl = 'https://www.flipkart.com/boat-stone-grenade-5-w-portable-bluetooth-speaker/p/itm0f38c2f530da5?pid=ACCFDBFR9ZCZTDGJ&lid=LSTACCFDBFR9ZCZTDGJUKDA7E&marketplace=FLIPKART&srno=b_1_1&otracker=hp_omu_Top%2BOffers_5_3.dealCard.OMU_MG06BUMHI8DW_3&otracker1=hp_omu_PINNED_neo%2Fmerchandising_Top%2BOffers_NA_dealCard_cc_5_NA_view-all_3&fm=neo%2Fmerchandising&iid=78c6c4aa-ba59-437b-b973-e57a583ee1c7.ACCFDBFR9ZCZTDGJ.SEARCH&ppt=browse&ppn=browse&ssid=ca4ygt9n0g0000001608474631861';
let exampleAmznUrl = 'https://www.amazon.in/Honor-HONOR-Band-5/dp/B07Z26SS9G/?_encoding=UTF8&pd_rd_w=E2RZU&pf_rd_p=e60c70f0-0541-4ba5-b6fc-ada95198a5fe&pf_rd_r=FVVSZP80NMR76D87FG70&pd_rd_r=c469c8b3-2ea8-4cb2-b9e3-8ca2cd005fe4&pd_rd_wg=Xwn0L&ref_=pd_gw_crs_zg_bs_1984443031';

async function extractDetailsFromPage() {
    const browser = await puppeteer.launch({
        headless: true, defaultViewport: null, args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--no-zygote',
            '--no-default-browser-check',
            '--bwsi',
            '--disable-dev-shm-usage',
            '--disable-infobars',
            '--hide-scrollbars',
        ],
    });

    const page = await browser.newPage();

    await page.goto(exampleFlpktUrl, { waitUntil: 'networkidle0' });
    console.log('Flipkart Product Details');
    console.log(await evaluateProductDetails(page, 'flipkart'));

    await page.goto(exampleAmznUrl, { waitUntil: 'networkidle0' });
    console.log('Amazon Product Details');
    console.log(await evaluateProductDetails(page, 'amazon'));

    await page.close();
    await browser.close();

    return 'Completed!';
}

extractDetailsFromPage()
    .then(res => console.log(res));
