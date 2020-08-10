var App = function(instance){
    if(!(this instanceof App)) return new App(instance);
    this.basePath = 'v0/network',
    this.server=instance;
}
App.prototype.createApp=async function(pathParams, reqBody){
    const response = await this.server.post(`${this.basePath }/${pathParams.networkID}/apps`,{
        name:reqBody.name,
        description: reqBody.description
    })
    return response;
}
App.prototype.getApps=async function(pathParams, queryParams={}){
    const response= await this.server.get(`${this.basePath }/${pathParams.networkID}/apps?page=${queryParams.page||1}&pageSize=${queryParams.pageSize||20}`)
    return response;
}
App.prototype.getApp=async function (pathParams) {
    const response= await this.server.get(`${this.basePath }/${pathParams.networkID}/apps/${pathParams.appID}`)
    return response;
}
App.prototype.updateApp = async function(pathParams, reqBody){
    const response = await this.server.put(`${this.basePath }/${pathParams.networkID}/apps/${pathParams.appID}`, {
        name: reqBody.name,
        description: reqBody.description
    })
    return response;
}
App.prototype.deleteApp = async function (pathParams){
    const response = await this.server.delete(`${this.basePath }/${pathParams.networkID}/apps/${pathParams.appID}`)
    return response
}
module.exports=App;