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
            let evaluatedValue = key === 'productImage' ?
                evaluateImageUrl(htmlDOM, platform, attribute) :
                (htmlDOM.window.document.querySelector(attribute) ?
                    htmlDOM.window.document.querySelector(attribute).innerHTML :
                    null);

            if (evaluatedValue && evaluatedValue !== 'unknown') {
                product[key] = evaluatedValue;
            }
        })
    });

    return product;
}

function evaluateImageUrl(dom, platform, attribute) {
    platform = platform.toLowerCase();

    switch (platform) {
        case 'flipkart': return JSON.parse(dom.window.document.getElementById("jsonLD") ? dom.window.document.getElementById("jsonLD").innerHTML : [{ image: '' }])[0].image;
        case 'amazon': return dom.window.document.querySelector(attribute) ? dom.window.document.querySelector(attribute).getAttribute('data-old-hires') : '';
        case 'myntra': return '';
        default: return '';
    }
}

module.exports = {
    evaluateProductDetails
};
