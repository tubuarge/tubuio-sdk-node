/*
Copyright 2020 TUBU ARGE

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * Contract Class to integrate with deployed contract on tubu.io
 */
class Contract {
    /**
     * Generate a new Contract object
     * @param {String} shortID Contract Short ID, it can be obtained on contract detail page
     * @param {String} api API URL
     */
    constructor(shortID, api) {
        this.shortID = shortID;
        this.api = api;
    }

    /**
     * Sending transaction to the deployed contract
     * @param {String} method  Method name on deployed contract, it can be found on the contract detail page
     * @param {Array} args  Method parameters
     * @param {String} tag  (Optional) Contract version tag, default latest
     */
    call(method, args = null, tag = '') {
        return this.api.integrationCall(this.shortID, method, args, tag);
    }

    /**
     * Call data from to the deployed contract
     * @param {String} method  Method name on deployed contract, it can be found on the contract detail page
     * @param {Array} args  Method parameters
     * @param {String} tag  (Optional) Contract version tag, default latest
     */
    send(method, args, tag = '') {
        return this.api.integrationSend(this.shortID, method, tag, args);
    }

    /**
     * Call events from to the deployed contract
     * @param {String} eventName  Event name on deployed contract, it can be found on the contract detail page
     * @param {String} tag  (Optional) Contract version tag, default latest
     */
    event(eventName, tag = '') {
        return this.api.integrationEvent(this.shortID, eventName, tag);
    }
}

module.exports = Contract;
