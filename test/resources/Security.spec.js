'use strict';

require('../testUtils');

describe('Security Resource', function () {

    describe('get permissions', function () {
        it('should get permissions for user', function (done) {
            K.Security.getPermissions(function (error, result) {
                if (error)
                    done(error);
                assert.isArray(result);
                assert.include(result, 'account:create');
                done();
            });
        });
    });

    describe('get user', function () {
        it('should get user information', function (done) {
            K.Security.getUser(function (error, result) {
                if (error)
                    done(error);
                expect(result.principal).to.equal('admin');
                expect(result.isAuthenticated).to.equal(true);
                done();
            });
        });
    });

});
