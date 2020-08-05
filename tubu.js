const axios = require('axios').default;
const fs = require('fs');
const FormData = require('form-data');


let BASE_URL=''
const AUTH_PATH=`${BASE_URL}/auth`
const NETWORK_PATH=`${BASE_URL}/api/network`
const CONTRACT_PATH=`${BASE_URL}/api/contract`


//opts -> {baseURL: string}
var TubuIO =  function(opts){
    if(!(this instanceof TubuIO)) return new TubuIO(opts);
    this.server =  axios.create({
        baseURL: opts.urlbase
    })

    this.server.defaults.timeout=10000;


    

}
//todo
//interceptor ekle

//reqBody -> {username: string, password: string}
TubuIO.prototype.login= async function(reqBody){
    const response = await this.server.post(`${AUTH_PATH}/login`, {
        username: reqBody.username,
        password: reqBody.password,
    })
    this.server.defaults.headers.common['Authorization']=response.data.token;
    return response; 
}


//network endpoints


//queryParams -> {page: int, pageSize: int}
TubuIO.prototype.getNetworks= async function(queryParams={}){
    const response = await this.server.get(`${NETWORK_PATH}?page=${queryParams.page || 1}&pageSize=${queryParams.pageSize||20}`,{},{
    })
    return response.data;
}


TubuIO.prototype.getNetworkByID=async function (pathParams) {
    const response = await this.server.get(`${NETWORK_PATH}/${pathParams.networkID}`)
    return response;
}



// TubuIO.prototype.updateNetwork = async function(pathParams, reqBody){
//     const response = await this.server.put(`${NETWORK_PATH}/${pathParams.networkID}`, reqBody)
//     return response;
// }

TubuIO.prototype.createApp=async function(pathParams, reqBody){
    const response = await this.server.post(`${NETWORK_PATH}/${pathParams.networkID}/apps`,{
        name:reqBody.name,
        description: reqBody.description
    })
    return response;
}
TubuIO.prototype.getApps=async function(pathParams, queryParams={}){
    const response= await this.server.get(`${NETWORK_PATH}/${pathParams.networkID}/apps?page=${queryParams.page||1}&pageSize=${queryParams.pageSize||20}`)
    return response;
}

TubuIO.prototype.getApp=async function (pathParams) {
    const response= await this.server.get(`${NETWORK_PATH}/${pathParams.networkID}/apps/${pathParams.appID}`)
    return response;
}

TubuIO.prototype.updateApp = async function(pathParams, reqBody){
    const response = await this.server.put(`${NETWORK_PATH}/${pathParams.networkID}/apps/${pathParams.appID}`, {
        name: reqBody.name,
        description: reqBody.description
    })
    return response;
}

TubuIO.prototype.deleteApp = async function (pathParams){
    const response = await this.server.delete(`${NETWORK_PATH}/${pathParams.networkID}/apps/${pathParams.appID}`)
    return response
}

TubuIO.prototype.deployContract = async function (pathParams,reqBody) {
    let form_data = new FormData();
        form_data.append("name", reqBody.name)
        form_data.append("application_id", reqBody.appID)
        form_data.append("description", reqBody.description)
        for (let i =0; i<reqBody.files.length; i++){
            let path = reqBody.files[i]
            form_data.append("files", createReadStream(path))
        }
    const response = await this.server.post(`${NETWORK_PATH}/${pathParams.networkID}/contract`,form_data,{
        headers: form_data.getHeaders()  
    })
    return response;
}
TubuIO.prototype.getContracts= async function (pathParams, queryParams={}){
    if(queryParams.hasOwnProperty("appID")){
        const response = await this.server.get(`${NETWORK_PATH}/${pathParams.networkID}/contract?page=${queryParams.page||1}&pageSize=${queryParams.pageSize||20}&app_id=${queryParams.appID}`)
        return response;
    }else{
        const response = await this.server.get(`${NETWORK_PATH}/${pathParams.networkID}/contract?page=${queryParams.page||1}&pageSize=${queryParams.pageSize||20}`)
        return response;    
    }
}

TubuIO.prototype.getContract = async function (pathParams){
    const response= await this.server.get(`${NETWORK_PATH}/${pathParams.networkID}/contract/${pathParams.shortID}`)
    return response;
}

TubuIO.prototype.deleteContract = async function (pathParams){
    const response= await this.server.delete(`${NETWORK_PATH}/${pathParams.networkID}/contract/${pathParams.shortID}`)
    return response;
}

TubuIO.prototype.updateContract = async function (pathParams,reqBody){
    const response = await this.server.put(`${NETWORK_PATH}/${pathParams.networkID}/contract/${pathParams.shortID}`,{
        name : reqBody.name,
        description: reqBody.description
    })
    return response;
}

TubuIO.prototype.invoke=async function (pathParams, reqBody){
    const response = await this.server.post(`${CONTRACT_PATH}/${pathParams.shortID}/${pathParams.method}`,{
        args: reqBody.args
    })
    return response
}

// TubuIO.prototype.call=async function (pathParams){
//     let queryString =""
//     if (queryParams.hasOwnProperty("args")){
//         const args = queryParams.args;
//         for(let i=0; i<args.length; i++){
//             if (i===0){
//             queryString+=`?args=${args[i]}`
//             }else{
//                 queryString+=`&args=${args[i]}`
//             }
//         }
//     }
//     const url=`${CONTRACT_PATH}/${pathParams.shortID}/${pathParams.method}${queryString}`
//     try {
//         const response = await this.server.get(`${CONTRACT_PATH}/${pathParams.shortID}/${pathParams.method}`)
        
//         return response
//     } catch (error) {
//     console.log(error)        
//     }
// }

module.exports = TubuIO;