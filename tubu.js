const axios = require('axios').default;

const Network = require('./tubunetwork')
const App = require('./tubuapp')
const Contract=require('./tubucontract')


//opts -> {baseURL: string}
class TubuIO {
    constructor(opts) {
        if (!(this instanceof TubuIO))
            return new TubuIO(opts);
        this.server = axios.create({
            baseURL: opts.urlbase
        });
        this.network = new Network(this.server);
        this.app = new App(this.server);
        this.contract = new Contract(this.server);
        this.server.defaults.timeout = 10000;
    }
    async login(reqBody) {
        const response = await this.server.post(`/auth/login`, {
            username: reqBody.username,
            password: reqBody.password,
        });
        this.server.defaults.headers.common['Authorization'] = response.data.token;
        return response;
    }
}
module.exports = TubuIO; 