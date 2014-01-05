'use strict';

require('../testUtils');

describe('Account Resource', function() {
  describe('retrieve', function() {
    it('Can create and retrieve an account', function(done) {
      var rand = new Date().getTime();

      K.Account.create({
        externalKey: rand,
        email: 'test-' + rand + '@killbill.com',
        name: 'bob ' + rand
      },
      'mocha',
      'testing',
      null,
      function(err, account) {
        if (err) {
          done(err);
        }

        // Check we can retrieve the account by id
        var accountId = account.accountId;
        K.Account.getById(accountId,
                          function(err, account) {
                            if (err) {
                              done(err);
                            }

                            expect(account.accountId).to.equal(accountId);

                            // Check we can retrieve the account via its external key
                            K.Account.getByExternalKey(account.externalKey,
                                                       function(err, account2) {
                                                         if (err) {
                                                           done(err);
                                                         }

                                                         expect(account2.accountId).to.equal(account.accountId);
                                                         expect(account2.externalKey).to.equal(account.externalKey);

                                                         done();
                                                       });
                          });
      });
    });
  });
});
