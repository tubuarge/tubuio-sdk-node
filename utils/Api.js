/*
Copyright 2020 TUBU ARGE

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const axios = require('axios');

class Api {
    constructor(token) {
        this.axios = axios.create({
            baseURL: 'https://api.tubu.io',
            timeout: 10000,
            headers: { ApiKey: token },
        });
    }

    integrationCall(shortID, method, args = null, tag = '') {
        let url = `/int/${shortID}/${method}`;
        if (tag) url += `/${tag}`;
        if (args)
            return this.axios
                .get(url, { params: { args } })
                .then((response) => response.data)
                .catch((err) => {
                    throw new Error(err.response.data.message);
                });
        return this.axios
            .get(url)
            .then((response) => response.data)
            .catch((err) => {
                throw new Error(err.response.data.message);
            });
    }

    integrationSend(shortID, method, tag = '', data = '') {
        let url = `/int/${shortID}/${method}`;
        if (tag) url += `/${tag}`;
        return this.axios
            .post(url, data)
            .then((response) => response.data)
            .catch((err) => {
                throw new Error(err.response.data.message);
            });
    }
    integrationEvent(shortID, eventName, tag = '') {
        let url = `/int/events/${eventName}/${shortID}`;
        if (tag) url += `/${tag}`;
        return this.axios
            .post(url, { filter: {}, fromBlock: 0 })
            .then((response) => response.data)
            .catch((err) => {
                throw new Error(err.response.data.message);
            });
    }

    applicationAccountCreate(data='') {
        let url = `/appAcount/`;
         return this.axios
        .post(url, data)
            .then((response) => response.data)
            .catch((err) => {
                throw new Error(err.response.data.message);
            });
    }
    applicationAccountGet(accountID) {
        let url = `/appAcount/${accountID}`;
        return this.axios
            .get(url)
            .then((response) => response.data)
            .catch((err) => {
                throw new Error(err.response.data.message);
            });
    }
    applicationAccountList() {
        let url = `/appAcount/`;
        return this.axios
            .get(url)
            .then((response) => response.data)
            .catch((err) => {
                throw new Error(err.response.data.message);
            });
    }
}

module.exports = Api;
