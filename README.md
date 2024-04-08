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
See test cases under `test` directory.

Release
- 
1. Update version in `package.json`
2. Commit directly into `master` branch.
3. Create git tag. Tag format is `v<version>`. For example, `v1.0.0`.
4. Push the tag to remote.
5. Go to https://github.com/killbill/killbill-client-js/releases/new, select the tag and fill in the release notes.
6. Publish the release.