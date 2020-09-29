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
const config = new killbill.Configuration({
    username: "admin"
    password: "password",
    apiKey: "bob",
    accessToken: "lazar",
    basePath: "http://localhost:8080"
});
const externalKey = "external_key";
new killbill.AccountApi(config).getAccountByKey(externalKey)
    .then(result => console.log(result))
    .catch(error => console.log(error));
```