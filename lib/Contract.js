class Contract {
    constructor(shortID, api) {
        this.shortID = shortID;
        this.api = api;
    }

    call(method, args = null, tag = '') {
        return this.api.integrationCall(this.shortID, method, args, tag);
    }

    send(method, data, tag = '') {
        return this.api.integrationSend(this.shortID, method, tag, data);
    }
}

module.exports = Contract;
