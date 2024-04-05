import {Account, AccountApi, Configuration, followLocationHeaderInterceptor, apiKey} from "../src";

import globalAxios from "axios";
import {beforeEach, describe, expect, it} from "vitest";

describe('Account Api', () => {

    let accountApi: AccountApi;
    let account: Account;
    let externalKey: string;

    beforeEach(() => {

        const axios = globalAxios.create();
        axios.interceptors.response.use(followLocationHeaderInterceptor)

        var config = new Configuration({
            username: 'admin',
            password: 'password',
            apiKey: apiKey('bob', 'lazar'),
            basePath: 'http://127.0.0.1:8080'
        });

        accountApi = new AccountApi(config, null, axios);
        externalKey = new Date().getTime().toString();

    });

    it('should create account', () => {
        account = {name: `Test Account ${externalKey}`, externalKey: externalKey};
        accountApi.createAccount(account, 'created-by')
            .then(result => {
                account = result.data;
                expect(account.externalKey).equals(externalKey);
            }).catch(error => error);
    });

    it('should get account by id',() => {
        const accountId = '<your-account-id>';
        accountApi.getAccount(accountId)
            .then(result => {
                let a = result.data;
                expect(a.accountId).equals(accountId);
                expect(a.externalKey).equals(externalKey);
            })
            .catch(error => error)
    });

    it('should update account', () => {
        account.name = `${account.name} updated!`
        accountApi.updateAccount(account, account.accountId, 'created-by')
            .then(result => {
                expect(result.status).equals(204);

            })
            .catch(error => error);
    });

    it('should search accounts', () => {
        accountApi.searchAccounts(externalKey)
            .then(result => {
                expect(result.data.length).greaterThan(0);
            })
            .catch(error => error);
    });

});