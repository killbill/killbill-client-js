'use strict';

require('../testUtils');

var Account = require('../../lib/resources/Account');
var PaymentMethod = require('../../lib/resources/PaymentMethod');


describe('Payment Method Resource', function () {

    var account, paymentMethod, rand;

    before(function(done) {
        rand = new Date().getTime();
        var a = {
            externalKey: rand,
            name: 'paymentmethods ' + rand
        };
        Account.create(a, 'mocha', 'testing', 'testing', function (error, result) {
            account = result;
            done();
        });
    });

    describe('create', function () {
        it('should create a payment method', function (done) {
            var p = {
                accountId: account.accountId,
                externalKey: rand.toString(),
                pluginName: '__EXTERNAL_PAYMENT__'
            };
            var params= {
                isDefault: false
            };

            PaymentMethod.create(p, 'mocha', 'testing', 'testing', params, function (error, result) {
                if (error)
                    throw error;
                expect(result.accountId).to.equal(account.accountId);
                expect(result.externalKey).to.equal(p.externalKey);
                expect(result.pluginName).to.equal(p.pluginName)
                paymentMethod = result;
                done();
            });
        });

        it('should not be the default payment method', function (done) {
            Account.getById(account.accountId, function (error, result) {
                if (error)
                    throw error;
                expect(result.paymentMethodId).not.to.equal(paymentMethod.paymentMethodId);
                done();
            });
        });
    });

    describe('set default', function() {
        it('should set the payment method as default', function (done) {
            PaymentMethod.setDefault(account.accountId, paymentMethod.paymentMethodId, 'mocha', 'testing', 'testing', function (error) {
                if (error)
                    throw error;
                Account.getById(account.accountId, function (error, result) {
                    if (error)
                        throw error;
                    expect(result.paymentMethodId).to.equal(paymentMethod.paymentMethodId);
                    done();
                });
            });
        });
    });

    describe('get by id', function () {
        it('should retrieve a payment method by id', function (done) {
            PaymentMethod.getById(paymentMethod.paymentMethodId, function (error, result) {
                if (error)
                    throw error;
                expect(result.paymentMethodId).to.equal(paymentMethod.paymentMethodId);
                done();
            });
        });
    });

    describe('list', function () {
        it('should list all payment methods', function (done) {
            PaymentMethod.list(function (error, result) {
                if (error)
                    throw error;
                assert.isArray(result);
                assert(result.length >= 1);
                done();
            });
        });
    });

    describe('delete by id', function () {
        it('should delete a payment method by id', function (done) {
            // Force delete
            var params = {
                deleteDefaultPmWithAutoPayOff: true
            };
            PaymentMethod.delete(paymentMethod.paymentMethodId, 'mocha', 'testing', 'testing', params, function (error) {
                if (error)
                    throw error;
                PaymentMethod.getById(paymentMethod.paymentMethodId, function (error, result) {
                    expect(result).to.equal(null);
                    done();
                })
            });
        });
    });
});
