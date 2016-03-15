K.Subscription = {
    SUBSCRIPTION_RESOURCE: K.BASE_RESOURCE + '/subscriptions',

    create: function (subscription, user, reason, comment, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        var options = {user: user, reason: reason, comment: comment};
        K._post(K.Subscription.SUBSCRIPTION_RESOURCE, subscription, params, options, callback);
    },

    createWithAddOns: function (subscriptions, user, reason, comment, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        var options = {user: user, reason: reason, comment: comment};
        K._post(K.Subscription.SUBSCRIPTION_RESOURCE + '/createEntitlementWithAddOns', subscriptions, params, options, callback);
    },

    getById: function (id, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        K._get(K.Subscription.SUBSCRIPTION_RESOURCE + '/' + id, params, {}, callback);
    },

    update: function (subscription, user, reason, comment, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        var options = {user: user, reason: reason, comment: comment};
        K._put(K.Subscription.SUBSCRIPTION_RESOURCE + '/' + subscription.subscriptionId, subscription, params, options, callback);
    },

    cancel: function (subscription, user, reason, comment, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        var options = {user: user, reason: reason, comment: comment};
        K._delete(K.Subscription.SUBSCRIPTION_RESOURCE + '/' + subscription.subscriptionId, params, options, callback);
    },

    uncancel: function (subscription, user, reason, comment, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        var options = {user: user, reason: reason, comment: comment};
        K._put(K.Subscription.SUBSCRIPTION_RESOURCE + '/' + subscription.subscriptionId + '/uncancel', {}, params, options, callback);
    },

    addCustomFields: function (id, customFields, user, reason, comment, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        var options = {user: user, reason: reason, comment: comment};
        K._post(K.Subscription.SUBSCRIPTION_RESOURCE + '/' + id + '/customFields', customFields, params, options, callback);
    },

    getCustomFields: function (id, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        K._get(K.Subscription.SUBSCRIPTION_RESOURCE + '/' + id + '/customFields', params, {}, callback);
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
        K._delete(K.Subscription.SUBSCRIPTION_RESOURCE + '/' + id + '/customFields', params, options, callback);
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
        K._post(K.Subscription.SUBSCRIPTION_RESOURCE + '/' + id + '/tags', {}, params, options, callback);
    },

    getTags: function (id, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        K._get(K.Subscription.SUBSCRIPTION_RESOURCE + '/' + id + '/tags', params, {}, callback);
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
        K._delete(K.Subscription.SUBSCRIPTION_RESOURCE + '/' + id + '/tags', params, options, callback);
    }

};
