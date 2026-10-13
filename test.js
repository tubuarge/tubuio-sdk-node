const Api = require('./utils/Api');

async function getAccountsByApplication() {
    const api = new Api('cd6eb103-13ca-4a1f-b20e-0994d5e9decd');

    const accounts = await api.applicationAccountList(2);
    console.log(accounts);
}

async function createAccountsByApplication() {
    const api = new Api('cd6eb103-13ca-4a1f-b20e-0994d5e9decd');
    const data = {
        username: 'test5',
        email: 'test5@tubu.io',
        password: '123456',
    };
    const accounts = await api.applicationAccountCreate(2, data);
    console.log(accounts);
}
createAccountsByApplication();
getAccountsByApplication();
