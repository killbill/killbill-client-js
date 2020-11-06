killbill-client-js
==================

JavaScript client library for Kill Bill.

It is designed to run both on the client side as well as on the server side (e.g. using node.js).

Codegen
-
Code is generated using [openapi-codegen](https://github.com/OpenAPITools/openapi-generator) typescript-axios template. 

To regenerate, overwrite kbswagger.yaml and `npm run codegen && npm run build`

Usage
-
``` javascript
const killbill = require('killbill');
const globalAxios = require('axios');

const axios = globalAxios.create();

//optional - follow location header when new object is created
axios.interceptors.response.use(killbill.followLocationHeaderInterceptor);

//optional - configure tough cookie support
const tough = require('tough-cookie');
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
axiosCookieJarSupport(axios);
axios.defaults.withCredentials = true;
axios.defaults.jar = new tough.CookieJar();

const config = new killbill.Configuration({
    username: "admin"
    password: "password",
    apiKey: killbill.apiKey("bob", "lazar"),
    basePath: "http://127.0.0.1:8080"
});

new killbill.AccountApi(config, null, axios).getAccountByKey("external_key")
    .then(result => console.log(result))
    .catch(error => console.log(error));
```