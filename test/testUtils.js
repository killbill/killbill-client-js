btoa = require("btoa");
XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var chai = require('chai');
expect = chai.expect;
assert = chai.assert;

dateFormat = require('dateformat');

require('../lib/killbill');
require('../lib/resources/Account');
require('../lib/resources/Subscription');
require('../lib/resources/Security');
