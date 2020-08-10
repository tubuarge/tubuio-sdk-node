const fs = require('fs');
const FormData = require('form-data');
class Contract {
    constructor(instance) {
        if (!(this instanceof Contract))
            return new Contract(instance);
        this.basePath = 'v0/network',
            this.methodPath = 'v0/contract';
        this.server = instance;
    }
    async deploy(pathParams, reqBody) {
        let form_data = new FormData();
        form_data.append("name", reqBody.name);
        form_data.append("application_id", reqBody.appID);
        form_data.append("description", reqBody.description);
        for (let i = 0; i < reqBody.files.length; i++) {
            let path = reqBody.files[i];
            form_data.append("files", fs.createReadStream(path));
        }
        const response = await this.server.post(`${this.basePath}/${pathParams.networkID}/contract`, form_data, {
            headers: form_data.getHeaders()
        });
        return response;
    }
    async getAll(pathParams, queryParams = {}) {
        if (queryParams.hasOwnProperty("appID")) {
            const response = await this.server.get(`${this.basePath}/${pathParams.networkID}/contract?page=${queryParams.page || 1}&pageSize=${queryParams.pageSize || 20}&app_id=${queryParams.appID}`);
            return response;
        }
        else {
            const response = await this.server.get(`${this.basePath}/${pathParams.networkID}/contract?page=${queryParams.page || 1}&pageSize=${queryParams.pageSize || 20}`);
            return response;
        }
    }
    async getByShortID(pathParams) {
        const response = await this.server.get(`${this.basePath}/${pathParams.networkID}/contract/${pathParams.shortID}`);
        return response;
    }
    async delete(pathParams) {
        const response = await this.server.delete(`${this.basePath}/${pathParams.networkID}/contract/${pathParams.shortID}`);
        return response;
    }
    async update(pathParams, reqBody) {
        const response = await this.server.put(`${this.basePath}/${pathParams.networkID}/contract/${pathParams.shortID}`, {
            name: reqBody.name,
            description: reqBody.description
        });
        return response;
    }
    async invoke(pathParams, reqBody) {
        const response = await this.server.post(`${this.methodPath}/${pathParams.shortID}/${pathParams.method}`, {
            args: reqBody.args
        });
        return response;
    }
    async call(pathParams, queryParams = {}) {
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
        const response = await this.server.get(`${this.methodPath}/${pathParams.shortID}/${pathParams.method}${queryString}`);
        return response;
    }
    async getTransactions(queryParams = {}) {
        let queryString = "";
        if (queryParams.hasOwnProperty("networkID")) {
            queryString += `?networkID=${queryParams.networkID}`;
            if (queryParams.hasOwnProperty("shortID")) {
                queryString += `&shortID=${queryParams.shortID}`;
            }
            queryString += `&page=${queryParams.page || 1}&pageSize=${queryParams.pageSize || 20}`;
        }
        else if (queryParams.hasOwnProperty("shortID")) {
            queryString += `?shortID=${queryParams.shortID}`;
            queryString += `&page=${queryParams.page || 1}&pageSize=${queryParams.pageSize || 20}`;
        }
        else {
            queryString += `?page=${queryParams.page || 1}&pageSize=${queryParams.pageSize || 20}`;
        }
        const response = await this.server.get(`${TRANSACTION_PATH}/${queryString}`);
        return response;
    }
    async getTransactionWithHash(pathParams) {
        const response = await this.server.get(`${TRANSACTION_PATH}/${pathParams.hash}`);
        return response;
    }
}
module.exports=Contract;