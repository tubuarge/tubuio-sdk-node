class Network {
    constructor(instance) {
        if (!(this instanceof Network))
            return new Network(instance);
        this.basePath = 'v0/network',
            this.server = instance;
    }
    async getAll(queryParams = {}) {
        const response = await this.server.get(`${this.basePath}?page=${queryParams.page || 1}&pageSize=${queryParams.pageSize || 20}`, {}, {});
        return response.data;
    }
    async getByID(pathParams) {
        const response = await this.server.get(`${this.basePath}/${pathParams.networkID}`);
        return response;
    }
}
module.exports=Network;