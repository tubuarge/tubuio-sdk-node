/*
Copyright 2020 TUBU ARGE

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const Contract = require('./Contract');
const Api = require('../utils/Api');
const ApplicationAccount = require('./ApplicationAccount');

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


    /**
     * Integration module for application account
     * @param {String} applicationID Application ID, it can be obtained on application detail page
     */
    applicationAccount(applicationID) {
        return new ApplicationAccount(applicationID, this.api);
    }
}

module.exports = Tubu;
