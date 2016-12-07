(function(exports){
    var BASE_RESOURCE = exports.BASE_RESOURCE;
    var _post = exports._post;
    var _get = exports._get;
    var _put = exports._put;
    var _delete = exports._delete;
    var _merge = exports._merge;
    var Account = exports.Account;

    if (typeof require !== 'undefined') {
        var killbill = require('../killbill');
        var BASE_RESOURCE = killbill.BASE_RESOURCE;
        var _post = killbill._post;
        var _get = killbill._get;
        var _put = killbill._put;
        var _delete = killbill._delete;
        var _merge = killbill._merge;

        Account = require('./Account')
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
        list: function (params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            _get(PaymentMethod.PAYMENT_METHOD_RESOURCE + '/pagination', params, {}, callback);
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

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
        module.exports = PaymentMethod;
    else
        exports.PaymentMethod = PaymentMethod;

})(typeof exports === 'undefined'? this['K'] : exports);