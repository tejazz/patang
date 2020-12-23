## Patang
Easy plug-in module for extracting product details for e-commerce websites like Flipkart and Amazon in an easy-to-read JSON format. It extends two implementations - with __Puppeteer__ and __DOM String__.

### Who Should Use This?
This module would come in handy if one is building for some kind of a __scraping operation__ and needs to evaluate product details. It takes care of the logic for extracting product details for supported platforms. 

### Supported Platforms
- [Flipkart](https://www.flipkart.com)
- [Amazon India](https://amazon.in) 

### Setup
Install the package in your Node.js application
```
npm i --save patang
```
You can go ahead and require it wherever you need to use it,
``` javascript
// sample file: ./index.js
const patang = require('patang');
```

### Usages - Examples
There are two ways to utilize the library
#### __With Puppeteer__
The `evaluateProductDetails` function of the `domEvaluator` module expects the platform name and the puppeteer page object to be made available.
```javascript
const axios = require('axios');
const { domEvaluator } = require('patang');

// Flipkart
let exampleFlpktUrl = 'https://www.flipkart.com/boat-stone-grenade-5-w-portable-bluetooth-speaker/p/itm0f38c2f530da5?pid=ACCFDBFR9ZCZTDGJ&lid=LSTACCFDBFR9ZCZTDGJUKDA7E&marketplace=FLIPKART&srno=b_1_1&otracker=hp_omu_Top%2BOffers_5_3.dealCard.OMU_MG06BUMHI8DW_3&otracker1=hp_omu_PINNED_neo%2Fmerchandising_Top%2BOffers_NA_dealCard_cc_5_NA_view-all_3&fm=neo%2Fmerchandising&iid=78c6c4aa-ba59-437b-b973-e57a583ee1c7.ACCFDBFR9ZCZTDGJ.SEARCH&ppt=browse&ppn=browse&ssid=ca4ygt9n0g0000001608474631861';

axios.get(exampleFlpktUrl)
    .then((res) => {
        console.log('Flipkart Product Details')
        // printing the extracted details as an example
        // use the return value as you see apt for your use-case 
        console.log(domEvaluator.evaluateProductDetails(res.data, 'flipkart'));
    });
```

#### __With DOM String__
The `evaluateProductDetails` function of the `pageEvaluator` module expects the HTML DOM string and one of the supported platform name as parameter.

``` javascript
const puppeteer = require('puppeteer');
const { pageEvaluator } = require('patang');

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
    console.log(await pageEvaluator.evaluateProductDetails(page, 'flipkart'));

    await page.goto(exampleAmznUrl, { waitUntil: 'networkidle0' });
    console.log('Amazon Product Details');
    console.log(await pageEvaluator.evaluateProductDetails(page, 'amazon'));

    await page.close();
    await browser.close();

    return 'Completed!';
}

// invoking the function
extractDetailsFromPage()
    .then(res => console.log(res));
```

### API

##### `domEvaluator`: Function
`evaluateProductDetails(dom: string, platform: string)`: Function
- `platform`: Values: `'flipkart' | 'amazon'`
- `dom`: Values: `'<html>....</html>'`
- Return Value: `Product Details Object`
e.g:
``` javascript
{ 
    title: 'boAt Stone Grenade 5 W Portable Bluetooth  Speaker<!-- -->&nbsp;&nbsp;(Charcoal Black, Mono Channel)',
    description: '<p>Listen to music in stellar quality with this boAt speaker. With a multitude of features, such as 7-hours of playback time, water-resistant, and easy access control, this speaker ensures a fulfilling aural experience.<br></p>',
    price: '₹1,499',
    productImage: 'http://rukmini1.flixcart.com/image/128/128/k0vbgy80pkrrdj/speaker/mobile-tablet-speaker/4/n/n/boat-stone-grenade-original-imafg96ffpnpgdv4.jpeg?q=70' 
}
```

##### `pageEvaluator`: Function
`evaluateProductDetails(page: object, platform: string)`: Function
- `platform`: Values: `'flipkart' | 'amazon'`
- `page`: Values: `[Puppeteer Page Object](https://pptr.dev/#?product=Puppeteer&version=v5.4.1&show=api-class-page)`
- Return Value: `Product Details Object`
e.g:
``` javascript
{ 
    title: 'boAt Stone Grenade 5 W Portable Bluetooth  Speaker<!-- -->&nbsp;&nbsp;(Charcoal Black, Mono Channel)',
    description: '<p>Listen to music in stellar quality with this boAt speaker. With a multitude of features, such as 7-hours of playback time, water-resistant, and easy access control, this speaker ensures a fulfilling aural experience.<br></p>',
    price: '₹1,499',
    productImage: 'http://rukmini1.flixcart.com/image/128/128/k0vbgy80pkrrdj/speaker/mobile-tablet-speaker/4/n/n/boat-stone-grenade-original-imafg96ffpnpgdv4.jpeg?q=70' 
}
```  

##### `platformIdentifiers`: Object
- Returns the attributes object for a particular platform
- Example:
``` javascript
const { platformIdentifiers } = require('patang');

console.log(platformIdentifiers.Flipkart); 
// Output
// {
//     title: ['.B_NuCI'],
//     description: ['div._1mXcCf'],
//     price: ['._30jeq3._16Jk6d'],
//     productImage: ['._396cs4._2amPTt._3qGmMb._3exPp9'],
// }
```

### License
[MIT](https://github.com/tejazz/patang/blob/main/LICENSE)

### Contributions - Guidelines
The project is open to one and all for contributions. Simply fork the project, make your changes and raise a PR. 