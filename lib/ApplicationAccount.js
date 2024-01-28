/*
Copyright 2020 TUBU ARGE

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


/**
 * Application Account Class to integrate with application accounts on tubu.io
 */
class ApplicationAccount {
    /**
     * Generate a new Contract object
     * @param {String} applicationID Contract Short ID, it can be obtained on contract detail page
     * @param {Api} api API 
     */
    constructor(applicationID, api) {
        this.applicationID = applicationID;
        this.api = api;
    }

    /**
     * Create a new account
     * @param {String} username  The username for the new account
     * @param {String} password  The password for the new account
     * @param {String} email  The email for the new account
     */
    create(username, password, email) {
        return this.api.applicationAccountCreate(this.applicationID, username, password, email);
    }

    /**
     * Get account information by account ID
     * @param {String} accountID  The ID of the account to retrieve
     */
    get(accountID) {
        return this.api.getAccount(this.applicationID, accountID); 
    }

    /**
     * List all accounts associated with the application
     */
    list() {
        return this.api.listAccounts(this.applicationID); 

    }
}

module.exports = ApplicationAccount;
