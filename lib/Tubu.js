const Contract = require('./Contract');
const Api = require('../utils/Api');

/**
 * tubu.io sdk main class
 */
class Tubu {
    /**
     * Generate a new tubu instance to integrate with contracts
     * @param {String} apiKey Special token for application, it can be obtained on application detail page
     */
    constructor(apiKey) {
        if (apiKey) {
            this.api = new Api(apiKey);
        } else {
            throw new Error('No api key is given!');
        }
    }

    /**
     * Integration module for contracts
     * @param {String} shortID Contract Short ID, it can be obtained on contract detail page
     */
    contract(shortID) {
        return new Contract(shortID, this.api);
    }
}

module.exports = Tubu;
