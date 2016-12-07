(function(exports){

    var BASE_RESOURCE = exports.BASE_RESOURCE;
    var _get = exports._get;

    var Account = exports.Account;

    if (typeof require !== 'undefined') {
        var killbill = require('../killbill');
        var BASE_RESOURCE = killbill.BASE_RESOURCE;
        var _get = killbill._get;

        Account = require('./Account')
    }

    var Payment = {
        PAYMENT_RESOURCE: BASE_RESOURCE + '/payments',

        getByAccountId: function(accountId, callback) {
            _get(Account.ACCOUNT_RESOURCE + '/' + accountId + '/payments', {}, {}, callback);
        }
    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = Payment;
    }
    else {
        exports.Payment = Payment;
    }

})(typeof exports === 'undefined'? this['K'] : exports);