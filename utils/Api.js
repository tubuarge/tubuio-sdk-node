const axios = require('axios');

class Api {
    constructor(token) {
        this.axios = axios.create({
            baseURL: 'https://devservice-dot-dynamic-sun-260208.appspot.com',
            timeout: 10000,
            headers: { ApiKey: token },
        });
    }

    integrationCall(shortID, method, args = null, tag = '') {
        let url = `/int/${shortID}/${method}`;
        if (tag) url += `/${tag}`;
        if (args) return this.axios.get(url, { params: { args } });
        return this.axios.get(url);
    }

    integrationSend(shortID, method, tag = '', data = '') {
        let url = `/int/${shortID}/${method}`;
        if (tag) url += `/${tag}`;
        return this.axios.post(url, data);
    }
}

module.exports = Api;
