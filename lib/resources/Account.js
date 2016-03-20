K.Account = {
    ACCOUNT_RESOURCE: K.BASE_RESOURCE + '/accounts',

    create: function (account, user, reason, comment, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        var options = {user: user, reason: reason, comment: comment};
        K._post(K.Account.ACCOUNT_RESOURCE, account, params, options, callback);
    },

    getById: function (id, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        K._get(K.Account.ACCOUNT_RESOURCE + '/' + id, params, {}, callback);
    },

    getByExternalKey: function (externalKey, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        params = K._merge(params, {externalKey: externalKey});
        K._get(K.Account.ACCOUNT_RESOURCE, params, {}, callback);
    },

    update: function (account, user, reason, comment, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        var options = {user: user, reason: reason, comment: comment};
        K._put(K.Account.ACCOUNT_RESOURCE + '/' + account.accountId, account, params, options, callback);
    },

    search: function (searchKey, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        K._get(K.Account.ACCOUNT_RESOURCE + '/search/' + searchKey, params, {}, callback);
    },

    list: function (params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        K._get(K.Account.ACCOUNT_RESOURCE + '/pagination', params, {}, callback);
    },

    timeline: function (id, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        K._get(K.Account.ACCOUNT_RESOURCE + '/' + id + '/timeline', params, {}, callback);
    },

    addCustomFields: function (id, customFields, user, reason, comment, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        var options = {user: user, reason: reason, comment: comment};
        K._post(K.Account.ACCOUNT_RESOURCE + '/' + id + '/customFields', customFields, params, options, callback);
    },

    getCustomFields: function (id, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        K._get(K.Account.ACCOUNT_RESOURCE + '/' + id + '/customFields', params, {}, callback);
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
        K._delete(K.Account.ACCOUNT_RESOURCE + '/' + id + '/customFields', params, options, callback);
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
        K._post(K.Account.ACCOUNT_RESOURCE + '/' + id + '/tags', {}, params, options, callback);
    },

    getTags: function (id, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        K._get(K.Account.ACCOUNT_RESOURCE + '/' + id + '/tags', params, {}, callback);
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
        K._delete(K.Account.ACCOUNT_RESOURCE + '/' + id + '/tags', params, options, callback);
    },

    addEmail: function (id, email, user, reason, comment, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        var options = {user: user, reason: reason, comment: comment};
        email.accountId = id;
        K._post(K.Account.ACCOUNT_RESOURCE + '/' + id + '/emails', email, params, options, callback);
    },

    getEmails: function (id, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        K._get(K.Account.ACCOUNT_RESOURCE + '/' + id + '/emails', params, {}, callback);
    },

    removeEmail: function (id, email, user, reason, comment, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        var options = {user: user, reason: reason, comment: comment};
        K._delete(K.Account.ACCOUNT_RESOURCE + '/' + id + '/emails/' + email.email, params, options, callback);
    }

};
