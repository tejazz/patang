const { determinePlatform } = require('../utils/platforms');
const jsdom = require('jsdom');

/*
    @dom: HTML source content to be read from (should be a string text)
    @platform: One e-commerce platform [flipkart, amazon, myntra]
*/
function evaluateProductDetails(dom, platform) {
    let platformParams = determinePlatform(platform);
    let product = {
        title: '',
        description: '',
        price: '',
        productImage: '',
    };
    let htmlDOM = new jsdom.JSDOM(dom);

    if (!htmlDOM || !platformParams) return null;

    Object.keys(platformParams).map((key) => {
        platformParams[key].map((attribute) => {
            let evaluatedValue = key === 'productImage' ? JSON.parse(htmlDOM.window.document.getElementById("jsonLD").innerHTML)[0].image : htmlDOM.window.document.querySelector(attribute).innerHTML;

            if (evaluatedValue && evaluatedValue !== 'unknown') {
                product[key] = evaluatedValue;
            }
        })
    });

    return product;
}

module.exports = {
    evaluateProductDetails
};
