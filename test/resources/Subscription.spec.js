'use strict';

require('../testUtils');
var dateFormat = require('dateformat');

var Account = require('../../lib/resources/Account');
var Subscription = require('../../lib/resources/Subscription');

describe('Subscription Resource', function () {

    var account, subscription, rand;

    before(function (done) {
        rand = new Date().getTime();
        var a = {
            externalKey: rand,
            name: 'subscription ' + rand,
            currency: 'USD'
        };
        Account.create(a, 'mocha', 'testing', 'testing', function (error, result) {
            account = result;
            done();
        });
    });

    describe('create', function () {
        it('should create a subscription', function (done) {
            var s = {
                accountId: account.accountId,
                externalKey: 'sub-' + rand,
                productName: 'Standard',
                productCategory: 'BASE',
                priceList: 'DEFAULT',
                billingPeriod: 'MONTHLY'
            };
            Subscription.create(s, 'mocha', 'testing', 'testing', function (error, result) {
                if (error)
                    throw error;

                expect(result.accountId).to.equal(account.accountId);
                expect(result.billingPeriod).to.equal(s.billingPeriod);
                expect(result.externalKey).to.equal(s.externalKey);
                expect(result.state).to.equal('ACTIVE');
                assert.isNotNull(result.bundleId);
                assert.isNotNull(result.subscriptionId);
                assert.isArray(result.events);
                subscription = result;
                done();
            });
        });

        //TODO default catalog doesn't have any addons - could upload catalog as part of test?
        it('should create a subscription with addons', function (done) {
            var baseSubscription = {
                accountId: account.accountId,
                externalKey: 'sub2-' + rand,
                productName: 'Standard',
                productCategory: 'BASE',
                priceList: 'DEFAULT',
                billingPeriod: 'MONTHLY'
            };

            Subscription.createWithAddOns([baseSubscription], 'mocha', 'testing', 'testing', function (error, result) {
                if (error)
                    throw error;
                expect(result.accountId).to.equal(account.accountId);
                expect(result.externalKey).to.equal(baseSubscription.externalKey);
                assert.isArray(result.subscriptions);
                assert(result.subscriptions.length === 1);
                done();
            });
        });
    });

    describe('get by id', function () {
        it('should retrieve subscription by id', function (done) {
            Subscription.getById(subscription.subscriptionId, function (error, result) {
                if (error)
                    throw error;
                expect(result.subscriptionId).to.equal(subscription.subscriptionId);
                done();
            });
        });
    });

    describe('update', function () {
        it('should update subscription', function (done) {
            subscription.productName = 'Super';
            subscription.planName = 'super-monthly';
            Subscription.update(subscription, 'mocha', 'testing', 'testing', function (error, result) {
                if (error)
                    throw error;
                expect(result.productName).to.equal('Super');
                subscription = result;
                done();
            });
        });
    });

    describe('custom fields', function () {

        var customFields = [];
        customFields.push({name: 'myCustomField', value: 'myValue'});
        customFields.push({name: 'anotherCustomField', value: 'anotherValue'});

        var verifyCustomFields = function (result) {
            assert.isArray(result);
            assert(result.length === 2);
            expect(result[0].objectId).to.equal(subscription.subscriptionId);
            expect(result[1].objectId).to.equal(subscription.subscriptionId);
            expect(result[0].objectType).to.equal('SUBSCRIPTION');
            expect(result[1].objectType).to.equal('SUBSCRIPTION');
            expect(result[0].name).to.equal('myCustomField');
            expect(result[1].name).to.equal('anotherCustomField');
            expect(result[0].value).to.equal('myValue');
            expect(result[1].value).to.equal('anotherValue');
        };

        it('should add custom fields to subscription', function (done) {
            Subscription.addCustomFields(subscription.subscriptionId, customFields, 'mocha', 'testing', 'testing', function (error, result) {
                if (error)
                    throw error;
                verifyCustomFields(result);
                customFields = result;
                done();
            });
        });

        it('should get custom fields for subscription', function (done) {
            Subscription.getCustomFields(subscription.subscriptionId, function (error, result) {
                if (error)
                    throw error;
                verifyCustomFields(result);
                done();
            });
        });

        it('should remove custom fields from subscription', function (done) {
            Subscription.removeCustomFields(subscription.subscriptionId, customFields, 'mocha', 'testing', 'testing', function (error, result) {
                if (error)
                    throw error;
                Subscription.getCustomFields(subscription.subscriptionId, function (error, result) {
                    if (error)
                        throw error;
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
            expect(result[0].objectId).to.equal(subscription.subscriptionId);
            expect(result[1].objectId).to.equal(subscription.subscriptionId);
            expect(result[0].objectType).to.equal('SUBSCRIPTION');
            expect(result[1].objectType).to.equal('SUBSCRIPTION');
            expect(result[0].tagDefinitionId).to.equal('00000000-0000-0000-0000-000000000007');
            expect(result[1].tagDefinitionId).to.equal('00000000-0000-0000-0000-000000000006');
            expect(result[0].tagDefinitionName).to.equal('PARTNER');
            expect(result[1].tagDefinitionName).to.equal('TEST');
        };

        it('should add tags to subscription', function (done) {
            Subscription.addTags(subscription.subscriptionId, tags, 'mocha', 'testing', 'testing', function (error, result) {
                if (error)
                    throw error;
                verifyTags(result);
                tags = result;
                done();
            });
        });

        it('should get tags for subscription', function (done) {
            Subscription.getTags(subscription.subscriptionId, function (error, result) {
                if (error)
                    throw error;
                verifyTags(result);
                done();
            });
        });

        it('should remove tags from subscription', function (done) {
            Subscription.removeTags(subscription.subscriptionId, tags, 'mocha', 'testing', 'testing', function (error, success) {
                if (error)
                    throw error;
                Account.getTags(subscription.subscriptionId, function (error, result) {
                    if (error)
                        throw error;
                    assert.isArray(result);
                    assert(result.length === 0);
                    done();
                });
            });
        });

        it('should get deleted tags for subscription', function (done) {
            Subscription.getTags(subscription.subscriptionId, {includedDeleted: true}, function (error, result) {
                if (error)
                    throw error;
                verifyTags(result);
                done();
            });
        });
    });

    describe('cancel', function () {
        it('should cancel subscription', function (done) {

            var requestedDate = new Date();
            requestedDate.setDate(requestedDate.getDate() + 7);
            requestedDate = dateFormat(requestedDate, 'yyyy-mm-dd');

            Subscription.cancel(subscription, 'mocha', 'testing', 'testing', {
                requestedDate: requestedDate,
                useRequestedDateForBilling: true
            }, function (error, result) {
                if (error)
                    throw error;
                Subscription.getById(subscription.subscriptionId, function (error, result) {
                    expect(result.cancelledDate).to.equal(requestedDate);
                    expect(result.billingEndDate).to.equal(requestedDate);
                    subscription = result;
                    done();
                });
            })
        });
        it('should uncancel subscription', function (done) {
            Subscription.uncancel(subscription, 'mocha', 'testing', 'testing', function (error, result) {
                if (error)
                    throw error;
                Subscription.getById(subscription.subscriptionId, function (error, result) {
                    expect(result.cancelledDate).to.equal(null);
                    expect(result.billingEndDate).to.equal(null);
                    subscription = result;
                    done();
                });
            });
        });
    });

});
