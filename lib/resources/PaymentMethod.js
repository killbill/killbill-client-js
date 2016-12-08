(function(exports){
    var BASE_RESOURCE, _post, _get, _put, _delete, _merge, Account;

    if (typeof require !== 'undefined') {
        var killbill = require('../killbill');
        BASE_RESOURCE = killbill.BASE_RESOURCE;
        _post = killbill._post;
        _get = killbill._get;
        _put = killbill._put;
        _delete = killbill._delete;
        _merge = killbill._merge;

        Account = require('./Account')
    }
    else {
        BASE_RESOURCE = exports.BASE_RESOURCE;
        _post = exports._post;
        _get = exports._get;
        _put = exports._put;
        _delete = exports._delete;
        _merge = exports._merge;
        Account = exports.Account;
    }

    var PaymentMethod = {
        PAYMENT_METHOD_RESOURCE: BASE_RESOURCE + '/paymentMethods',

        create: function (paymentMethod, user, reason, comment, params, callback) {
            var uri = Account.ACCOUNT_RESOURCE + '/' + paymentMethod.accountId + '/paymentMethods';
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            var options = {user: user, reason: reason, comment: comment};
            _post(uri, paymentMethod, params, options, callback);
        },
        getById: function (paymentMethodId, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            _get(PaymentMethod.PAYMENT_METHOD_RESOURCE + '/' + paymentMethodId, params, {}, callback);
        },
        list: function (accountId, params, callback) {
            var uri = Account.ACCOUNT_RESOURCE + '/' + accountId + '/paymentMethods';
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            _get(uri, params, {}, callback);
        },
        setDefault: function (accountId, paymentMethodId, user, reason, comment, params, callback) {
            var uri = Account.ACCOUNT_RESOURCE + '/' + accountId + '/paymentMethods/' + paymentMethodId + '/setDefault';
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            var options = {user: user, reason: reason, comment: comment};
            _put(uri, {}, params, options, callback);
        },
        delete: function (paymentMethodId, user, reason, comment, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            var options = {user: user, reason: reason, comment: comment};
            _delete(PaymentMethod.PAYMENT_METHOD_RESOURCE + '/' + paymentMethodId, params, options, callback);
        }
    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = PaymentMethod;
    }
    else {
        exports.PaymentMethod = PaymentMethod;
    }

})(typeof exports === 'undefined'? this['K'] : exports);