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

    var Invoice = {
        INVOICE_RESOURCE: BASE_RESOURCE + '/invoices',

        getById: function(invoiceId, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            _get(Invoice.INVOICE_RESOURCE + '/' + invoiceId, params, {}, callback);
        },

        getByAccountId: function(accountId, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            _get(Account.ACCOUNT_RESOURCE + '/' + accountId + '/invoices', params, {}, callback);
        }
    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = Invoice;
    }
    else {
        exports.Invoice = Invoice;
    }

})(typeof exports === 'undefined'? this['K'] : exports);