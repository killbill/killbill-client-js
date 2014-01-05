K.Payment = {
  PAYMENT_RESOURCE: K.BASE_RESOURCE + '/payments',

  getByAccountId: function(accountId, callback) {
    K._get(K.Account.ACCOUNT_RESOURCE + '/' + accountId + '/payments', {}, {}, callback);
  }
};
