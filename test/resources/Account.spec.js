'use strict';

require('../testUtils');


describe('Account Resource', function () {

    var account;

    describe('create', function () {
        it('should create an account', function (done) {
            var rand = new Date().getTime();
            var a = {
                externalKey: rand,
                email: 'test-' + rand + '@killbill.com',
                name: 'bob ' + rand
            };
            K.Account.create(a, 'mocha', 'testing', 'testing', function (error, result) {
                if (error)
                    done(error);
                account = result;
                done();
            });
        });
    });

    describe('get by id', function () {
        it('should retrieve an account by id', function (done) {
            K.Account.getById(account.accountId, function (error, result) {
                if (error)
                    done(error);
                expect(result.accountId).to.equal(account.accountId);
                done();
            });
        });
    });

    describe('get by external key', function () {
        it('should retrieve an account by external key', function (done) {
            K.Account.getByExternalKey(account.externalKey, function (error, result) {
                if (error)
                    done(error);
                expect(result.accountId).to.equal(account.accountId);
                expect(result.externalKey).to.equal(account.externalKey);
                done();
            });
        });
    });

    describe('update', function () {
        it('should update account', function (done) {
            var a = {
                accountId: account.accountId,
                name: account.name + ' updated'
            };
            K.Account.update(a, 'mocha', 'testing', 'testing', function (error, result) {
                if (error)
                    done(error);
                expect(result.accountId).to.equal(account.accountId);
                expect(result.name).to.equal(a.name);
                account = result;
                done();
            });
        });
    });

    describe('search', function () {
        it('should find accounts', function (done) {
            K.Account.search('bob', {offset: 0, limit: 100}, function (error, result) {
                if (error)
                    done(error);
                assert.isArray(result);
                assert(result.length >= 1);
                done();
            });
        });
    });

    describe('list', function () {
        it('should list accounts', function (done) {
            K.Account.list(function (error, result) {
                if (error)
                    done(error);
                assert.isArray(result);
                assert(result.length >= 1);
                done();
            });
        });
    });

    describe('timeline', function () {
        it('should return account timeline', function (done) {
            K.Account.timeline(account.accountId, function (error, result) {
                if (error)
                    done(error);
                expect(result.account.accountId).to.equal(account.accountId);
                assert.isArray(result.bundles);
                assert.isArray(result.invoices);
                assert.isArray(result.payments);
                done();
            });
        });
    });

    describe('customFields', function () {

        var customFields = [];
        customFields.push({name: 'myCustomField', value: 'myValue'});
        customFields.push({name: 'anotherCustomField', value: 'anotherValue'});

        var verifyCustomFields = function (result) {
            assert.isArray(result);
            assert(result.length === 2);
            expect(result[0].objectId).to.equal(account.accountId);
            expect(result[1].objectId).to.equal(account.accountId);
            expect(result[0].objectType).to.equal('ACCOUNT');
            expect(result[1].objectType).to.equal('ACCOUNT');
            expect(result[0].name).to.equal('myCustomField');
            expect(result[1].name).to.equal('anotherCustomField');
            expect(result[0].value).to.equal('myValue');
            expect(result[1].value).to.equal('anotherValue');
        };

        it('should add custom field to account', function (done) {
            K.Account.addCustomFields(account.accountId, customFields, 'mocha', 'testing', 'testing', function (error, result) {
                if (error)
                    done(error);
                verifyCustomFields(result);
                customFields = result;
                done();
            })
        });

        it('should get custom fields for account', function (done) {
            K.Account.getCustomFields(account.accountId, function (error, result) {
                if (error)
                    done(error);
                verifyCustomFields(result);
                done();
            });
        });

        it('should remove custom fields from account', function (done) {
            K.Account.removeCustomFields(account.accountId, customFields, 'mocha', 'testing', 'testing', function (error, result) {
                if (error)
                    done(error);
                K.Account.getCustomFields(account.accountId, function (error, result) {
                    if (error)
                        done(error);
                    assert.isArray(result);
                    assert(result.length === 0);
                    done();
                });
            });
        });

    });

    describe('tags', function () {
        var tags = [];
        tags.push({tagDefinitionId: '00000000-0000-0000-0000-000000000007'});
        tags.push({tagDefinitionId: '00000000-0000-0000-0000-000000000006'});

        var verifyTags = function (result) {
            assert.isArray(result);
            assert(result.length === 2);
            expect(result[0].objectId).to.equal(account.accountId);
            expect(result[1].objectId).to.equal(account.accountId);
            expect(result[0].objectType).to.equal('ACCOUNT');
            expect(result[1].objectType).to.equal('ACCOUNT');
            expect(result[0].tagDefinitionId).to.equal('00000000-0000-0000-0000-000000000007');
            expect(result[1].tagDefinitionId).to.equal('00000000-0000-0000-0000-000000000006');
            expect(result[0].tagDefinitionName).to.equal('PARTNER');
            expect(result[1].tagDefinitionName).to.equal('TEST');
        };

        it('should add tags to account', function (done) {
            K.Account.addTags(account.accountId, tags, 'mocha', 'testing', 'testing', function (error, result) {
                if (error)
                    done(error);
                verifyTags(result);
                tags = result;
                done();
            });
        });

        it('should get tags for account', function (done) {
            K.Account.getTags(account.accountId, function (error, result) {
                if (error)
                    done(error);
                verifyTags(result);
                done();
            });
        });

        it('should remove tags from account', function (done) {
            K.Account.removeTags(account.accountId, tags, 'mocha', 'testing', 'testing', function (error, success) {
                if (error)
                    done(error);
                K.Account.getTags(account.accountId, function (error, result) {
                    if (error)
                        done(error);
                    assert.isArray(result);
                    assert(result.length === 0);
                    done();
                });
            });
        });

        it('should get deleted tags for account', function (done) {
            K.Account.getTags(account.accountId, {includedDeleted: true}, function (error, result) {
                if (error)
                    done(error);
                verifyTags(result);
                done();
            });
        });
    });

    describe('emails', function () {
        var email = {email: 'test1@killbill.com'};
        var verifyEmails = function (result) {
            assert.isArray(result);
            assert(result.length === 1);
            expect(result[0].accountId).to.equal(account.accountId);
            expect(result[0].email).to.equal('test1@killbill.com');
        };

        it('should add email to account', function (done) {
            K.Account.addEmail(account.accountId, email, 'mocha', 'testing', 'testing', function (error, result) {
                if (error)
                    done(error);
                verifyEmails(result);
                email = result[0];
                done();
            });
        });

        it('should get emails for account', function (done) {
            K.Account.getEmails(account.accountId, function (error, result) {
                if (error)
                    done(error);
                verifyEmails(result);
                done();
            });
        });

        it('should remove email from account', function (done) {
            K.Account.removeEmail(account.accountId, email, 'mocha', 'testing', 'testing', function (error, result) {
                if (error)
                    done(error);

                K.Account.getEmails(account.accountId, function (error, result) {
                    if (error)
                        done(error);
                    assert.isArray(result);
                    assert(result.length === 0);
                    done();
                });
            });
        });
    });

});
