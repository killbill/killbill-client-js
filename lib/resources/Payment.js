(function(exports){

    var BASE_RESOURCE, _get, Account;

    if (typeof require !== 'undefined') {
        var killbill = require('../killbill');
        BASE_RESOURCE = killbill.BASE_RESOURCE;
        _get = killbill._get;

        Account = require('./Account')
    }
    else {
        BASE_RESOURCE = exports.BASE_RESOURCE;
        _get = exports._get;

        Account = exports.Account;
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