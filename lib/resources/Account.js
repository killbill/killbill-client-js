(function(exports){
    var BASE_RESOURCE, _post, _get, _put, _delete, _merge;

    if (typeof require !== 'undefined') {
        var killbill = require('../killbill');
        BASE_RESOURCE = killbill.BASE_RESOURCE;
        _post = killbill._post;
        _get = killbill._get;
        _put = killbill._put;
        _delete = killbill._delete;
        _merge = killbill._merge;
    }
    else {
        BASE_RESOURCE = exports.BASE_RESOURCE;
        _post = exports._post;
        _get = exports._get;
        _put = exports._put;
        _delete = exports._delete;
        _merge = exports._merge;        
    }

    var Account = {
        ACCOUNT_RESOURCE: BASE_RESOURCE + '/accounts',

        create: function (account, user, reason, comment, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            var options = {user: user, reason: reason, comment: comment};
            _post(Account.ACCOUNT_RESOURCE, account, params, options, callback);
        },

        getById: function (id, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            _get(Account.ACCOUNT_RESOURCE + '/' + id, params, {}, callback);
        },

        getByExternalKey: function (externalKey, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            params = _merge(params, {externalKey: externalKey});
            _get(Account.ACCOUNT_RESOURCE, params, {}, callback);
        },

        update: function (account, user, reason, comment, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            var options = {user: user, reason: reason, comment: comment};
            _put(Account.ACCOUNT_RESOURCE + '/' + account.accountId, account, params, options, callback);
        },

        search: function (searchKey, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            _get(Account.ACCOUNT_RESOURCE + '/search/' + searchKey, params, {}, callback);
        },

        list: function (params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            _get(Account.ACCOUNT_RESOURCE + '/pagination', params, {}, callback);
        },

        timeline: function (id, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            _get(Account.ACCOUNT_RESOURCE + '/' + id + '/timeline', params, {}, callback);
        },

        addCustomFields: function (id, customFields, user, reason, comment, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            var options = {user: user, reason: reason, comment: comment};
            _post(Account.ACCOUNT_RESOURCE + '/' + id + '/customFields', customFields, params, options, callback);
        },

        getCustomFields: function (id, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            _get(Account.ACCOUNT_RESOURCE + '/' + id + '/customFields', params, {}, callback);
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
            _delete(Account.ACCOUNT_RESOURCE + '/' + id + '/customFields', params, options, callback);
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
            _post(Account.ACCOUNT_RESOURCE + '/' + id + '/tags', {}, params, options, callback);
        },

        getTags: function (id, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            _get(Account.ACCOUNT_RESOURCE + '/' + id + '/tags', params, {}, callback);
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
            _delete(Account.ACCOUNT_RESOURCE + '/' + id + '/tags', params, options, callback);
        },

        addEmail: function (id, email, user, reason, comment, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            var options = {user: user, reason: reason, comment: comment};
            email.accountId = id;
            _post(Account.ACCOUNT_RESOURCE + '/' + id + '/emails', email, params, options, callback);
        },

        getEmails: function (id, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            _get(Account.ACCOUNT_RESOURCE + '/' + id + '/emails', params, {}, callback);
        },

        removeEmail: function (id, email, user, reason, comment, params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            var options = {user: user, reason: reason, comment: comment};
            _delete(Account.ACCOUNT_RESOURCE + '/' + id + '/emails/' + email.email, params, options, callback);
        }

    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = Account;
    }
    else {
        exports.Account = Account;
    }

})(typeof exports === 'undefined'? this['K'] : exports);