const TubuIO = require("../tubu");
let instance;
beforeAll(()=>{
    instance = new TubuIO({
        urlbase: "https://api-test.tubu.io",
    });  
})
describe('instance create and login',()=>{
    test('TubuIO instance gets created correctly', async (done)=>{
        expect(instance).toHaveProperty('server');
        done();
    })
    test('Login correctly', async(done)=>{
        const sampleData={
            urlPath:'/auth/login',
            reqBody:{
                username:'tubutubu',
                password:'d0M4t35_3548'
            }
        }
        jest.spyOn(instance, 'login').mockImplementation((data)=>data)
        const res = await instance.login(sampleData);
        expect(instance.login).toHaveBeenCalledWith(sampleData)
        expect(res.reqBody.username).toBe(sampleData.reqBody.username)
        expect(res.reqBody.password).toBe(sampleData.reqBody.password)
        expect(res.urlPath).toBe(sampleData.urlPath)
        done();
    })
})
describe('network', ()=>{
    test('get users all networks', async (done)=>{
        const sampleData={
            urlPath:'/v0/network',
            queryParams:{
                page:12,
                pageSize:21
            }
        }
        jest.spyOn(instance, 'getNetworks').mockImplementation((data)=>data)
        const res =await instance.getNetworks(sampleData)
        expect(instance.getNetworks).toHaveBeenCalledWith(sampleData)
        expect(res.urlPath).toBe(sampleData.urlPath);
        expect(res.queryParams.page).toBe(sampleData.queryParams.page)
        expect(res.queryParams.pageSize).toBe(sampleData.queryParams.pageSize)
        done();
    })
    test('get users network with ID', async(done)=>{
        const sampleData={
            urlPath: '/v0/network',
            pathParams:{
                networkID:1
            }
        }
        jest.spyOn(instance, 'getNetworkByID').mockImplementation((data)=>data)
        const res = await instance.getNetworkByID(sampleData)
        expect(instance.getNetworkByID).toHaveBeenCalledWith(sampleData)
        expect(res.urlPath).toBe(sampleData.urlPath);
        expect(res.pathParams.networkID).toBe(sampleData.pathParams.networkID)
        done();
    })
})
describe('application', ()=>{
    test('create an application in the given network', async(done)=>{
        const sampleData={
            urlPath:'/vo/network',
            pathParams:{
                networkID:1, 
            },
            reqBody:{
                name:"app1",
                description:"best app"
            }
        }
        jest.spyOn(instance, 'createApp').mockImplementation((data)=>data)
        const res = await instance.createApp(sampleData)
        expect(instance.createApp).toHaveBeenCalledWith(sampleData)
        expect(res.urlPath).toBe(sampleData.urlPath)
        expect(res.reqBody.name).toBe(sampleData.reqBody.name)
        expect(res.reqBody.description).toBe(sampleData.reqBody.description)
        done();
    })
    test('get all the apps of the user in the given network',async(done)=>{
        const sampleData={
            urlPath:'/v0/network',
            pathParams:{
                networkID:1
            },
            queryParams:{
                page:3,
                pageSize:34
            }
        }
        
        jest.spyOn(instance,'getApps').mockImplementation((data)=>data)
        const res = await instance.getApps(sampleData)
        expect(instance.getApps).toHaveBeenCalledWith(sampleData)
        expect(instance.getApps).toHaveBeenCalledTimes(1);
        expect(res.urlPath).toBe(sampleData.urlPath)
        expect(res.pathParams.networkID).toBe(sampleData.pathParams.networkID)
        done();
    })
    test('get the app with the given network and app ID', async(done)=>{
        const sampleData={
            urlPath:'/v0/network',
            pathParams:{
                networkID:1,
                appID:2
            }
        }
        jest.spyOn(instance,'getApp').mockImplementation((data)=>data)
        const res = await instance.getApp(sampleData)
        expect(instance.getApp).toHaveBeenCalledWith(sampleData);
        expect(res.urlPath).toBe(sampleData.urlPath)
        expect(res.pathParams.networkID).toBe(sampleData.pathParams.networkID)
        expect(res.pathParams.appID).toBe(sampleData.pathParams.appID)
        done();
    })
    test('update the app with the given network and app ID with the given name and description', async(done)=>{
        const sampleData={
            urlPath:'/vo/network',
            pathParams:{
                networkID:1,
                appID:13
            },
            reqBody:{
                name:"app1",
                description:"description1"
            }
        }
        jest.spyOn(instance, 'updateApp').mockImplementation((data)=>data)
        const res = await instance.updateApp(sampleData)
        expect(instance.updateApp).toHaveBeenCalledWith(sampleData)
        expect(res.urlPath).toBe(sampleData.urlPath)
        expect(res.pathParams.networkID).toBe(sampleData.pathParams.networkID)
        expect(res.pathParams.appID).toBe(sampleData.pathParams.appID)
        expect(res.reqBody.name).toBe(sampleData.reqBody.name)
        expect(res.reqBody.description).toBe(sampleData.reqBody.description)
        done();
    })
    test('delete the app with the given network and app ID', async (done)=>{
        const sampleData={
            urlPath:'/vo/network',
            pathParams:{
                networkID:1,
                appID:13
            }
        }
        jest.spyOn(instance, 'deleteApp').mockImplementation((data)=>data)
        const res = await instance.deleteApp(sampleData)
        expect(instance.deleteApp).toHaveBeenCalledWith(sampleData)
        expect(res.urlPath).toBe(sampleData.urlPath)
        expect(res.pathParams.networkID).toBe(sampleData.pathParams.networkID)
        expect(res.pathParams.appID).toBe(sampleData.pathParams.appID)
        done();
    })
})
describe('contract ', ()=>{
    test('deploy a contract with given files and details', async (done)=>{
        const sampleData = {
            urlPath: "/v0/network",
            pathParams: {
                networkID: 1
            },
            reqBody:{
                name: "contract1",
                description:"best desc",
                application_id:2,
                files:["./contract1.sol", "./contract2.sol"]
            }
        }
        jest.spyOn(instance, 'deployContract').mockImplementation((data)=>{
            return data;
        })
        const res = await instance.deployContract(sampleData)
        expect(instance.deployContract).toHaveBeenCalledWith(sampleData)
        expect(res.urlPath).toBe(sampleData.urlPath)
        expect(res.reqBody.name).toBe(sampleData.reqBody.name)
        expect(res.reqBody.files[0]).toBe(sampleData.reqBody.files[0])
        done();
    })
    test('get the contracts of the user in the given network or app', async(done)=>{
        const sampleData= {
            urlPath:"v0/network",
            pathParams:{networkID:1},
            queryParams:{
                appID:14
            }
        }
        jest.spyOn(instance, 'getContracts').mockImplementation((data)=>data);
        const res = await instance.getContracts(sampleData);
        expect(instance.getContracts).toHaveBeenCalledWith(sampleData)
        expect(res.urlPath).toBe(sampleData.urlPath)
        expect(res.queryParams.appID).toBe(sampleData.queryParams.appID)
        done();
    })
    test('get the contract in the network using its shortID', async(done)=>{
        const sampleData={
            urlPath:"/v0/network",
            pathParams:{
                networkID:1,
                shortID:"123asd345"
            }
        }
        jest.spyOn(instance,'getContract').mockImplementation((data)=>data);
        const res = await instance.getContract(sampleData)
        expect(instance.getContract).toHaveBeenCalledWith(sampleData)
        expect(res.urlPath).toBe(sampleData.urlPath)
        expect(res.pathParams.shortID).toBe(sampleData.pathParams.shortID)
        done();
    })
    test('delete the contract with given shortID', async(done)=>{
        const sampleData={
            urlPath:"/v0/network",
            pathParams:{
                networkID:1,
                shortID:"123asd345"
            }
        }
        jest.spyOn(instance,'deleteContract').mockImplementation((data)=>data);
        const res = await instance.deleteContract(sampleData)
        expect(instance.deleteContract).toHaveBeenCalledWith(sampleData)
        expect(res.urlPath).toBe(sampleData.urlPath)
        expect(res.pathParams.shortID).toBe(sampleData.pathParams.shortID)
        done();
    })
    test('update the contract with given shortID', async(done)=>{
    const sampleData={
        urlPath:"/v0/network",
        pathParams:{
            networkID:1,
            shortID:"123asd345"
        },
        reqBody:{
            name:"tubuContract",
            description:"best tubu contract"
        }
    }
    jest.spyOn(instance, 'updateContract').mockImplementation((data)=>data);
    const res = await instance.updateContract(sampleData)
    expect(instance.updateContract).toHaveBeenCalledWith(sampleData)
    expect(res.urlPath).toBe(sampleData.urlPath)
    expect(res.pathParams.shortID).toBe(sampleData.pathParams.shortID)
    expect(res.reqBody.name).toBe(sampleData.reqBody.name);
    done();
    })
})
describe('transaction ', ()=>{
    test('send a transaction by invoking a function in the given contract',async(done)=>{
        const sampleData={
            urlPath:"/v0/contract",
            pathParams:{
                shortID:"123asd234",
                method:"invoke"
            },
            reqBody:{
                args:["that","function"]
            }
        }
        jest.spyOn(instance, 'invoke').mockImplementation((data)=>data);
        const res = await instance.invoke(sampleData)
        expect(instance.invoke).toHaveBeenCalledWith(sampleData)
        expect(res.urlPath).toBe(sampleData.urlPath)
        expect(res.reqBody.args).toBe(sampleData.reqBody.args)
        expect(res.pathParams.method).toBe(sampleData.pathParams.method)
        expect(res.pathParams.shortID).toBe(sampleData.pathParams.shortID)
        done();
    })
    test('call a return function from the contract with given shortID', async(done)=>{
        const sampleData={
            urlPath:"/v0/contract",
            pathParams:{
                shortID:"123asd234",
                method:"getSomething"
            },
            queryParams:{
                args:["thatOne"]
            }
        }
        jest.spyOn(instance, 'call').mockImplementation((data)=>data);
        const res = await instance.call(sampleData)
        expect(instance.call).toHaveBeenCalledWith(sampleData)
        expect(res.pathParams.shortID).toBe(sampleData.pathParams.shortID)
        expect(res.queryParams.args).toBe(sampleData.queryParams.args)
        done();
    })
    test('get the transactions with networkID or shortID', async(done)=>{
        const sampleData={
            urlPath:"/v0/transactions",
            queryParams:{
                networkID:2,
                shortID:"123asd234qwe345",
                page:1,
                pageSize:23
            }
        }
        jest.spyOn(instance, 'getTransactions').mockImplementation((data)=>data)
        const res = await instance.getTransactions(sampleData)
        expect(instance.getTransactions).toHaveBeenCalledWith(sampleData)
        expect(res.urlPath).toBe(sampleData.urlPath)
        expect(res.queryParams.shortID).toBe(sampleData.queryParams.shortID)
        done();
    })
    test('get the transaction details with the transaction hash', async(done)=>{
        const sampleData={
            urlPath:"/v0/transactions",
            pathParams:{
                hash:"alkdsf23746921875ytqlksjdef871gfbg073145"
            }
        }
        jest.spyOn(instance ,'getTransactionWithHash').mockImplementation((data)=>data)

        const res = await instance.getTransactionWithHash(sampleData)
        expect(instance.getTransactionWithHash).toHaveBeenCalledWith(sampleData)
        expect(res.pathParams.hash).toBe(sampleData.pathParams.hash)
        expect(res.urlPath).toBe(sampleData.urlPath)
        done();
    })
})
