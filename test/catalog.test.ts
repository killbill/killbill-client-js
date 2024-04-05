import {describe, expect, it} from "vitest";
import {apiKey, CatalogApi, Configuration} from "../src";
import {AxiosResponse} from "axios";

describe('Catalog Api', () => {

    const config = new Configuration({
        username: 'admin',
        password: 'password',
        apiKey: apiKey('bob', 'lazar'),
        basePath: 'http://127.0.0.1:8080'
    });

    it('getCatalogXml', async () => {
        try {
            const catalogApi = new CatalogApi(config);
            const response: AxiosResponse = await catalogApi.getCatalogXml('2013-02-10T00:00:00+00:00');
            expect(response).toBeDefined();
            expect(response.status).equals(200);
            expect(response.data).toBeDefined();
        } catch (error) {
            throw error;
        }
    });
});