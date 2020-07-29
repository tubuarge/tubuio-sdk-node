const axios = require('axios').default;
const fs = require('fs');


let BASE_URL=''
const AUTH_PATH=`${BASE_URL}/auth`
const NETWORK_PATH=`${BASE_URL}/api/network`
const CONTRACT_PATH=`${BASE_URL}/api/contract`


//opts -> {baseURL: string}
var TubuIO =  function(opts){
    if(!(this instanceof TubuIO)) return new TubuIO(opts);
    this.server = axios.create({
        baseURL: opts.urlbase
    })
    this.server.defaults.timeout=10000;


    

}
//todo
//interceptor ekle

//opts -> {username: string, password: string}
TubuIO.prototype.login= async function(reqBody){
    const response = await this.server.post(`${AUTH_PATH}/login`, {
        username: reqBody.username,
        password: reqBody.password,
    })
    this.server.defaults.headers.common['Authorization']=response.data.token;
    return response; 
}


//network endpoints


//quey params -> {page: int, pageSize: int}
TubuIO.prototype.getNetworks= async function(queryParams={}){

    
    const response = await this.server.get(`${NETWORK_PATH}?page=${queryParams.page || 1}&pageSize=${queryParams.pageSize||20}`,{},{

    })
    return response.data;
}


TubuIO.prototype.getNetworkByID=async function (pathParams) {
    await this.server.get(`${NETWORK_PATH}/${pathParams.networkID}`).then((response)=>{
    return response.data;
    })
}





module.exports = TubuIO;