/* eslint-disable no-unused-expressions */
const Api = require('../utils/Api');
const Contract = require('../lib/Contract');
const Tubu = require('../lib/Tubu');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('API', function () {
    let api;
    let intCallStub;
    let intSendStub;
    beforeEach(function () {
        api = new Api('this is a token');
        intCallStub = sinon.stub(api, 'integrationCall');
        intSendStub = sinon.stub(api, 'integrationSend');
    });
    afterEach(function () {
        intCallStub.restore();
        intSendStub.restore();
    });
    it('creates an axios object with given token', function () {
        expect(api).to.have.property('axios');
        expect(api.axios).to.exist;
        expect(api.axios.defaults).to.have.property('baseURL');
        expect(api.axios.defaults.baseURL).to.equal(
            'https://devservice-dot-dynamic-sun-260208.appspot.com'
        );
        expect(api.axios.defaults).to.have.property('timeout');
        expect(api.axios.defaults).to.have.property('headers');
        expect(api.axios.defaults.headers).to.have.property('ApiKey');
        expect(api.axios.defaults.headers.ApiKey).to.equal('this is a token');
    });
    it('calls integrationCall method ', function () {
        api.integrationCall('this is shortID', 'this is method');
        expect(intCallStub.calledOnce).to.be.true;
        expect(intCallStub.args[0]).to.contains('this is shortID');
        expect(intCallStub.args[0]).to.contains('this is method');
    });
    it('calls integrationSend method ', function () {
        api.integrationSend('this is shortID', 'this is method');
        expect(intSendStub.calledOnce).to.be.true;
        expect(intSendStub.args[0]).to.contains('this is shortID');
        expect(intSendStub.args[0]).to.contains('this is method');
    });
});
describe('CONTRACT', function () {
    let contract;
    let callStub;
    let sendStub;
    beforeEach(function () {
        contract = new Contract(
            'this is a shortID',
            new Api('this is an ApiKey')
        );
        callStub = sinon.stub(contract, 'call');
        sendStub = sinon.stub(contract, 'send');
    });
    afterEach(function () {
        callStub.restore();
        sendStub.restore();
    });
    it('creates a contract instance with shortID including an api object', function () {
        expect(contract).to.have.property('shortID');
        expect(contract).to.have.property('api');
        expect(contract.api.axios).to.exist;
        expect(contract.api.axios.defaults).to.have.property('baseURL');
        expect(contract.api.axios.defaults.baseURL).to.equal(
            'https://devservice-dot-dynamic-sun-260208.appspot.com'
        );
        expect(contract.api.axios.defaults).to.have.property('timeout');
        expect(contract.api.axios.defaults).to.have.property('headers');
        expect(contract.api.axios.defaults.headers).to.have.property('ApiKey');
        expect(contract.api.axios.defaults.headers.ApiKey).to.equal(
            'this is an ApiKey'
        );
    });
    it('calls integrationCall method ', function () {
        contract.call('this is shortID', 'this is method');
        expect(callStub.calledOnce).to.be.true;
        expect(callStub.args[0]).to.contains('this is shortID');
        expect(callStub.args[0]).to.contains('this is method');
    });
    it('calls integrationSend method ', function () {
        contract.send('this is shortID', 'this is method');
        expect(sendStub.calledOnce).to.be.true;
        expect(sendStub.args[0]).to.contains('this is shortID');
        expect(sendStub.args[0]).to.contains('this is method');
    });
});
describe('TUBU', function () {
    let tubu;
    let createStub;
    beforeEach(function () {
        tubu = new Tubu('this is the ApiKey');
        createStub = sinon.stub(tubu, 'createContract');
    });
    afterEach(function () {
        createStub.restore();
    });
    it('creates a tubu instance including the api object', function () {
        expect(tubu).to.have.property('api');
        expect(tubu.api.axios).to.exist;
        expect(tubu.api.axios.defaults).to.have.property('baseURL');
        expect(tubu.api.axios.defaults.baseURL).to.equal(
            'https://devservice-dot-dynamic-sun-260208.appspot.com'
        );
        expect(tubu.api.axios.defaults).to.have.property('timeout');
        expect(tubu.api.axios.defaults).to.have.property('headers');
        expect(tubu.api.axios.defaults.headers).to.have.property('ApiKey');
        expect(tubu.api.axios.defaults.headers.ApiKey).to.equal(
            'this is the ApiKey'
        );
    });
    it('calls the createContract method with given shortID', function () {
        tubu.createContract('this is the ShortID');
        expect(createStub.calledOnce).to.be.true;
        expect(createStub.args[0]).to.contains('this is the ShortID');
    });
});
