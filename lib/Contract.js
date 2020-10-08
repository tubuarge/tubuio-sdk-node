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
}

module.exports = Contract;
