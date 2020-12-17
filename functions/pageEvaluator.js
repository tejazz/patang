const { Flipkart, Amazon, Myntra } = require('../constants/productParams');

/*
    @page: Puppeteer page object
    @platform: One e-commerce platform [flipkart, amazon, myntra]
*/
async function evaluateProductDetails(page, platform) {
    let platformParams = {};
    switch (platform) {
        case 'flipkart': platformParams = Flipkart;
            break;
        case 'amazon': platformParams = Amazon;
            break;
        case 'myntra': platformParams = Myntra;
            break;
        default: platformParams = Flipkart;
            break;
    };

    return await page.evaluate((platform) => {
        let product = {
            title: '',
            description: '',
            price: '',
            productImage: '',
        };

        // run through properties for the platform
        Object.keys(platform).map((key) => {
            platform[key].map((attribute) => {
                let evaluatedValue = key === 'productImage' ? document.querySelector(attribute).currentSrc : document.querySelector(attribute).innerText;

                if (evaluatedValue && evaluatedValue !== 'unknown') {
                    product[key] = evaluatedValue;
                }
            })
        });
        
        return product;
    }, platformParams);
}

module.exports = {
    evaluateProductDetails
};
