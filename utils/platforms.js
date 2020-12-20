const { Flipkart, Amazon, Myntra } = require('../constants/productParams');

const determinePlatform = (platform) => {
    switch (platform) {
        case 'flipkart': return Flipkart;
        case 'amazon': return Amazon;
        case 'myntra': return Myntra;
        default: return null;
    };
};

module.exports = {
    determinePlatform
};
