(function(exports){

    var BASE_RESOURCE = exports.BASE_RESOURCE;
    var _post = exports._post;
    var _get = exports._get;
    var _put = exports._put;
    var _delete = exports._delete;

    if (typeof require !== 'undefined') {
        var killbill = require('../killbill');
        var BASE_RESOURCE = killbill.BASE_RESOURCE;
        var _post = killbill._post;
        var _get = killbill._get;
        var _put = killbill._put;
        var _delete = killbill._delete;
    }

    var Subscription = {
        SUBSCRIPTION_RESOURCE: BASE_RESOURCE + '/subscriptions',

        create: function (subscription, user, reason, comment, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            var options = {user: user, reason: reason, comment: comment};
            _post(Subscription.SUBSCRIPTION_RESOURCE, subscription, params, options, callback);
        },

        createWithAddOns: function (subscriptions, user, reason, comment, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            var options = {user: user, reason: reason, comment: comment};
            _post(Subscription.SUBSCRIPTION_RESOURCE + '/createEntitlementWithAddOns', subscriptions, params, options, callback);
        },

        getById: function (id, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            _get(Subscription.SUBSCRIPTION_RESOURCE + '/' + id, params, {}, callback);
        },

        update: function (subscription, user, reason, comment, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            var options = {user: user, reason: reason, comment: comment};
            _put(Subscription.SUBSCRIPTION_RESOURCE + '/' + subscription.subscriptionId, subscription, params, options, callback);
        },

        cancel: function (subscription, user, reason, comment, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            var options = {user: user, reason: reason, comment: comment};
            _delete(Subscription.SUBSCRIPTION_RESOURCE + '/' + subscription.subscriptionId, params, options, callback);
        },

        uncancel: function (subscription, user, reason, comment, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            var options = {user: user, reason: reason, comment: comment};
            _put(Subscription.SUBSCRIPTION_RESOURCE + '/' + subscription.subscriptionId + '/uncancel', {}, params, options, callback);
        },

        addCustomFields: function (id, customFields, user, reason, comment, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            var options = {user: user, reason: reason, comment: comment};
            _post(Subscription.SUBSCRIPTION_RESOURCE + '/' + id + '/customFields', customFields, params, options, callback);
        },

        getCustomFields: function (id, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            _get(Subscription.SUBSCRIPTION_RESOURCE + '/' + id + '/customFields', params, {}, callback);
        },

        removeCustomFields: function (id, customFields, user, reason, comment, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            var options = {user: user, reason: reason, comment: comment};
            params.customFieldList = customFields.map(function (item) {
                return item.customFieldId;
            }).join(',');
            _delete(Subscription.SUBSCRIPTION_RESOURCE + '/' + id + '/customFields', params, options, callback);
        },

        addTags: function (id, tags, user, reason, comment, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            var options = {user: user, reason: reason, comment: comment};
            params.tagList = tags.map(function (item) {
                return item.tagDefinitionId;
            }).join(',');
            _post(Subscription.SUBSCRIPTION_RESOURCE + '/' + id + '/tags', {}, params, options, callback);
        },

        getTags: function (id, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            _get(Subscription.SUBSCRIPTION_RESOURCE + '/' + id + '/tags', params, {}, callback);
        },

        removeTags: function (id, tags, user, reason, comment, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            var options = {user: user, reason: reason, comment: comment};
            params.tagList = tags.map(function (item) {
                return item.tagDefinitionId;
            }).join(',');
            _delete(Subscription.SUBSCRIPTION_RESOURCE + '/' + id + '/tags', params, options, callback);
        }

    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
        module.exports = Subscription;
    else
        exports.Subscription = Subscription;

})(typeof exports === 'undefined'? this['K'] : exports);