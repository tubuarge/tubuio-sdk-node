const axios = require('axios').default;
const fs = require('fs');
const FormData = require('form-data');


let BASE_URL=''
const AUTH_PATH=`${BASE_URL}/auth`
const NETWORK_PATH=`${BASE_URL}/api/network`
const CONTRACT_PATH=`${BASE_URL}/api/contract`


class TubuIO {
    constructor(opts) {
        if (!(this instanceof TubuIO))
            return new TubuIO(opts);
        this.server = axios.create({
            baseURL: opts.urlbase
        });
        this.server.defaults.timeout = 10000;
    }
    async login(urlPath,reqBody) {
        const response = await this.server.post(urlPath, {
            username: reqBody.username,
            password: reqBody.password,
        });
        this.server.defaults.headers.common['Authorization'] = response.data.token;
        return response.data;
    }
    async getNetworks(urlPath,queryParams = {}) {
        const response = await this.server.get(`${urlPath}?page=${queryParams.page || 1}&pageSize=${queryParams.pageSize || 20}`);
        return response;
    }
    async getNetworkByID(urlPath,pathParams) {
        const response = await this.server.get(`${urlPath}/${pathParams.networkID}`);
        return response;
    }
    async createApp(urlPath,pathParams, reqBody) {
        const response = await this.server.post(`${urlPath}/${pathParams.networkID}/apps`, {
            name: reqBody.name,
            description: reqBody.description
        });
        return response;
    }
    async getApps(urlPath,pathParams, queryParams = {}) {
        const response = await this.server.get(`${urlPath}/${pathParams.networkID}/apps?page=${queryParams.page || 1}&pageSize=${queryParams.pageSize || 20}`);
        return response;
    }
    async getApp(urlPath,pathParams) {
        const response = await this.server.get(`${urlPath}/${pathParams.networkID}/apps/${pathParams.appID}`);
        return response;
    }
    async updateApp(urlPath,pathParams, reqBody) {
        const response = await this.server.put(`${urlPath}/${pathParams.networkID}/apps/${pathParams.appID}`, {
            name: reqBody.name,
            description: reqBody.description
        });
        return response;
    }
    async deleteApp(urlPath,pathParams) {
        const response = await this.server.delete(`${urlPath}/${pathParams.networkID}/apps/${pathParams.appID}`);
        return response;
    }
    async deployContract(urlPath,pathParams, reqBody) {
        let form_data = new FormData();
        form_data.append("name", reqBody.name);
        form_data.append("application_id", reqBody.appID);
        form_data.append("description", reqBody.description);
        for (let i = 0; i < reqBody.files.length; i++) {
            let path = reqBody.files[i];
            form_data.append("files", createReadStream(path));
        }
        const response = await this.server.post(`${urlPath}/${pathParams.networkID}/contract`, form_data, {
            headers: form_data.getHeaders()
        });
        return response;
    }
    async getContracts(urlPath,pathParams, queryParams = {}) {
        if (queryParams.hasOwnProperty("appID")) {
            const response = await this.server.get(`${urlPath}/${pathParams.networkID}/contract?page=${queryParams.page || 1}&pageSize=${queryParams.pageSize || 20}&app_id=${queryParams.appID}`);
            return response;
        }
        else {
            const response = await this.server.get(`${urlPath}/${pathParams.networkID}/contract?page=${queryParams.page || 1}&pageSize=${queryParams.pageSize || 20}`);
            return response;
        }
    }
    async getContract(urlPath,pathParams) {
        const response = await this.server.get(`${urlPath}/${pathParams.networkID}/contract/${pathParams.shortID}`);
        return response;
    }
    async deleteContract(urlPath,pathParams) {
        const response = await this.server.delete(`${urlPath}/${pathParams.networkID}/contract/${pathParams.shortID}`);
        return response;
    }
    async updateContract(urlPath,pathParams, reqBody) {
        const response = await this.server.put(`${urlPath}/${pathParams.networkID}/contract/${pathParams.shortID}`, {
            name: reqBody.name,
            description: reqBody.description
        });
        return response;
    }
    async invoke(urlPath,pathParams, reqBody) {
        const response = await this.server.post(`${urlPath}/${pathParams.shortID}/${pathParams.method}`, {
            args: reqBody.args
        });
        return response;
    }
    async call(urlPath,pathParams,queryParams={}) {
        let queryString = "";
        if (queryParams.hasOwnProperty("args")) {
            const args = queryParams.args;
            for (let i = 0; i < args.length; i++) {
                if (i === 0) {
                    queryString += `?args=${args[i]}`;
                }
                else {
                    queryString += `&args=${args[i]}`;
                }
            }
        }
        const response = await this.server.get(`${urlPath}/${pathParams.shortID}/${pathParams.method}${queryString}`);
        return response;
    }
    async getTransactions(urlPath, queryParams={}){
        let queryString="";
        if(queryParams.hasOwnProperty("networkID")){
            queryString+=`?networkID=${queryParams.networkID}`
            if(queryParams.hasOwnProperty("shortID")){
                queryString+=`&shortID=${queryParams.shortID}`
            }
            queryString+=`&page=${queryParams.page||1}&pageSize=${queryParams.pageSize||20}`
        }else if(queryParams.hasOwnProperty("shortID")){
            queryString+=`?shortID=${queryParams.shortID}`
            queryString+=`&page=${queryParams.page||1}&pageSize=${queryParams.pageSize||20}`

        }
        else{
            queryString+=`?page=${queryParams.page||1}&pageSize=${queryParams.pageSize||20}`
        }
        const response = await this.server.get(`${urlPath}/${queryString}`)
        return response
    }
    async getTransactionWithHash(urlPath,pathParams){
        const response = await this.server.get(`${urlPath}/${pathParams.hash}`)
        return response;
    }
}

















module.exports = TubuIO;