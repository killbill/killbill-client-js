K.PaymentMethod = {
    PAYMENT_METHOD_RESOURCE: K.BASE_RESOURCE + '/paymentMethods',

    create: function (paymentMethod, user, reason, comment, params, callback) {
        var uri = K.Account.ACCOUNT_RESOURCE + '/' + paymentMethod.accountId + '/paymentMethods';
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        var options = {user: user, reason: reason, comment: comment};
        K._post(uri, paymentMethod, params, options, callback);
    },
    getById: function (paymentMethodId, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        K._get(K.PaymentMethod.PAYMENT_METHOD_RESOURCE + '/' + paymentMethodId, params, {}, callback);
    },
    list: function (params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        K._get(K.PaymentMethod.PAYMENT_METHOD_RESOURCE + '/pagination', params, {}, callback);
    },
    setDefault: function (accountId, paymentMethodId, user, reason, comment, params, callback) {
        var uri = K.Account.ACCOUNT_RESOURCE + '/' + accountId + '/paymentMethods/' + paymentMethodId + '/setDefault';
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        var options = {user: user, reason: reason, comment: comment};
        K._put(uri, {}, params, options, callback);
    },
    delete: function (paymentMethodId, user, reason, comment, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        var options = {user: user, reason: reason, comment: comment};
        K._delete(K.PaymentMethod.PAYMENT_METHOD_RESOURCE + '/' + paymentMethodId, params, options, callback);
    }
};
