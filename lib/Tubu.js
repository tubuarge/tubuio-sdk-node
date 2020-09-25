const Contract = require('./Contract');
const Api = require('../utils/Api');

class Tubu {
    constructor(apiKey) {
        this.api = new Api(apiKey);
    }

    createContract(shortID, api = this.api) {
        return new Contract(shortID, api);
    }
}

module.exports = Tubu;
