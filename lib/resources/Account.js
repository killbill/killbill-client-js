K.Account = {
  ACCOUNT_RESOURCE: K.BASE_RESOURCE + '/accounts',

  create: function(account, user, reason, comment, callback) {
    K._post(K.Account.ACCOUNT_RESOURCE, account, {}, { user: user, reason: reason, comment: comment }, callback);
  },

  getById: function(id, callback) {
    K._get(K.Account.ACCOUNT_RESOURCE + '/' + id, {}, {}, callback);
  },

  getByExternalKey: function(externalKey, callback) {
    K._get(K.Account.ACCOUNT_RESOURCE, { externalKey: externalKey }, {}, callback);
  }
};