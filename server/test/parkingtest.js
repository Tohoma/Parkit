//TODO rearrange delete and search so to avoid multiple callbacks! -Peyton Cross

var parker = require('../models/parker');
var user1 = {
    username: "Sample",
    password: "123"
}
var user2 = {
    username: "Random",
    password: "456"
}
var user3 = {
    username: "Fulcrum",
    password: "789"
}
var chai = require('chai');
var assert = chai.assert


describe('Parker', function() {
    describe('create', function() {
        it('should register account in database', function(done) {
            parker.create(user1, function(err) {
                if (err) done(err);
                else done();
            });

        });
        it('should not create account with the same username', function(done) {
            parker.create(user1, function(err) {
                if (err) done();
                else done('Duplicate account created!');
            })
        })
    });
    describe('delete', function() {
        it('should delete user account in database', function(done) {
            parker.delete(user1.username, function(err) {
                if (err) done(err);
                else done();
            })
        })
    });
    describe('search', function() {
        it('should not find the user1 in database', function(done) {
            parker.search(user1.username, function(err, res) {
                assert(res.length === 0);
                done();
            })
        });
        it('should find user2 in database', function(done) {
            parker.create(user2, function(err, res) {
                parker.search(user2.username, function(err, res) {
                    assert(res[0].username === user2.username);
                    parker.delete(user2.username, function(err) {
                        if (err) done(err);
                        done();
                    });

                })

            })
        })
    });
    describe('authenticate', function() {
        it("should autheticate user's password with what's created", function(done) {
            parker.create(user3, function(err) {
                parker.authenticate(user3.username, user3.password, function(err, res) {
                    assert(res);
                    done();
                })
            })
        });
        it("should fail to authenticate", function(done) {
            parker.authenticate(user3.username, user2.password, function(err, res) {
                assert(!res);
                done();
            })
        })
    })
});