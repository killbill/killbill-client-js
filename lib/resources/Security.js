K.Security = {
    SECURITY_RESOURCE: K.BASE_RESOURCE + '/security',

    getPermissions: function (params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        K._get(K.Security.SECURITY_RESOURCE + '/permissions', params, {}, callback);
    },

    getUser: function (params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }
        K._get(K.Security.SECURITY_RESOURCE + '/subject', params, {}, callback);
    }

};
