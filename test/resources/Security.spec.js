'use strict';

require('../testUtils');
var Security = require('../../lib/resources/Security')

describe('Security Resource', function () {

    describe('get permissions', function () {
        it('should get permissions for user', function (done) {
            Security.getPermissions(function (error, result) {
                if (error)
                    throw error;
                assert.isArray(result);
                assert.include(result, 'account:create');
                done();
            });
        });
    });

    describe('get user', function () {
        it('should get user information', function (done) {
            Security.getUser(function (error, result) {
                if (error)
                    throw error;
                expect(result.principal).to.equal('admin');
                expect(result.isAuthenticated).to.equal(true);
                done();
            });
        });
    });

});
