'use strict';

require('../testUtils');

describe('Account Resource', function() {
  var rand = new Date().getTime(),
      user = {
        externalKey: rand,
        email: 'test-' + rand + '@killbill.com',
        name: 'bob ' + rand
      },
      account;

  describe('Create', function(){
    it('Can create a user', function(done){
      K.Account.create(user, 'mocha', 'testing', null ,function(error, kbAccount){
        if (error){
          done(error);
        }

        account = kbAccount;
        done();
      })
    })
  });

  describe('Retrieve by Id', function(){
    it('Can retrieve an account', function(done){
      var accountId = account.accountId;
      K.Account.getById(accountId, function(error, account) {
        if (error) {
          done(error);
        }

        expect(account.accountId).to.equal(accountId);

        done();
      })
    });
  });

  describe('Retrieve by External Key', function(){
    it('Can retrieve an account by external key', function (done) {
      var externalKey = account.externalKey;
      K.Account.getByExternalKey(account.externalKey, function(error, account){
        if (error){
          done(error);
        }

        expect(account.externalKey).to.equal(externalKey);

        done();
      });
    });
  });

});
