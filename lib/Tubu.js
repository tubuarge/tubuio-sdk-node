const Contract = require('./Contract');
const Api = require('../utils/Api');

class Tubu {
    constructor(apiKey) {
        if (apiKey) {
            this.api = new Api(apiKey);
        } else {
            throw new Error('No api key is given!');
        }
    }

    contract(shortID, api = this.api) {
        return new Contract(shortID, api);
    }
}

module.exports = Tubu;
