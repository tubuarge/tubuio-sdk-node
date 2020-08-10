class App {
    constructor(instance) {
        if (!(this instanceof App))
            return new App(instance);
        this.basePath = 'v0/network',
            this.server = instance;
    }
    async createApp(pathParams, reqBody) {
        const response = await this.server.post(`${this.basePath}/${pathParams.networkID}/apps`, {
            name: reqBody.name,
            description: reqBody.description
        });
        return response;
    }
    async getApps(pathParams, queryParams = {}) {
        const response = await this.server.get(`${this.basePath}/${pathParams.networkID}/apps?page=${queryParams.page || 1}&pageSize=${queryParams.pageSize || 20}`);
        return response;
    }
    async getApp(pathParams) {
        const response = await this.server.get(`${this.basePath}/${pathParams.networkID}/apps/${pathParams.appID}`);
        return response;
    }
    async updateApp(pathParams, reqBody) {
        const response = await this.server.put(`${this.basePath}/${pathParams.networkID}/apps/${pathParams.appID}`, {
            name: reqBody.name,
            description: reqBody.description
        });
        return response;
    }
    async deleteApp(pathParams) {
        const response = await this.server.delete(`${this.basePath}/${pathParams.networkID}/apps/${pathParams.appID}`);
        return response;
    }
}
module.exports=App;