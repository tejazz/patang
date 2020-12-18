const { determinePlatform } = require('../utils/platforms');

/*
    @page: Puppeteer page object
    @platform: One e-commerce platform [flipkart, amazon, myntra]
*/
async function evaluateProductDetails(page, platform) {
    let platformParams = determinePlatform(platform);

    return await page.evaluate((platform) => {
        let product = {
            title: '',
            description: '',
            price: '',
            productImage: '',
        };

        // run through properties for the platform
        Object.keys(platformParams).map((key) => {
            platformParams[key].map((attribute) => {
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
