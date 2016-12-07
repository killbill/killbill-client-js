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

    var Security = {
        SECURITY_RESOURCE: BASE_RESOURCE + '/security',

        getPermissions: function (params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            _get(Security.SECURITY_RESOURCE + '/permissions', params, {}, callback);
        },

        getUser: function (params, callback) {
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            _get(Security.SECURITY_RESOURCE + '/subject', params, {}, callback);
        }

    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
        module.exports = Security;
    else
        exports.Security = Security;

})(typeof exports === 'undefined'? this['K'] : exports);
