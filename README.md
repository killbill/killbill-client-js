# killbill-client-js


JavaScript client library for Kill Bill.

It is designed to run both on the client side as well as on the server side (e.g. using node.js).

## Configuration

Set environment variables so the local instance can be available and integration tests will pass on the Travis build. Add the following to environment variables to your bash profile:

```bash
API_KEY='bob'
API_SECRET='lazar'
USERNAME='admin'
PASSWORD='password'
URL='http://127.0.0.1:8080'
```

## Tests

Use node.js to run the tests:

```
npm install
npm test
```
