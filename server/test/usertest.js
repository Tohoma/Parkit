//TODO rearrange delete and search so to avoid multiple callbacks! -Peyton Cross

var user = require('../models/user');

var user1 = {
    username: "Sample",
    password: "123"
}
var user2 = {
    username: "Random",
    password: "456"
}
//Fulcrum is currently in database.
var user3 = {
    username: "Fulcrum",
    password: "789"
}

var user4 = {
    username: "Sammy",
    password: "yg400",
    streetaddress: "3607 Manhattan Beach Blvd",
    apt: "55B",
    city: "Los Angeles",
    zipcode: 90260,
    state: "California"
}

var user5 = {
    username: "Jammy",
    password: "yg400",
    streetaddress: "3607 Manhattan Beach Blvd",
    apt: "55B",
    city: "Los Angeles",
    zipcode: 90260,
    state: "California"
}



//Weird issue authenticate fails immediately after creating user.

var chai = require('chai');
var assert = chai.assert


describe('Account functionality', function() {
    describe('create', function() {
        it('should register account in database', function(done) {
            user.create(user1, function(err) {
                if (err) done(err);
                else done();
            });

        });
        it('should register user with house', function(done) {
            user.create(user4, function(err) {
                if (err) done(err);
                else done();
            });

        });
        it('should not create account with the same username', function(done) {
            user.create(user1, function(err) {
                if (err) done();
                else done('Duplicate account created!');
            })
        })
    });
    });
    describe('delete', function() {
        it('should delete user account in database', function(done) {
            user.delete(user1.username, function(err) {
                if (err) done(err);
                else done();
            })
        })
        it('should delete user account in database', function(done) {
            user.delete(user4.username, function(err) {
                if (err) done(err);
                else done();
            })
        })
    });
    describe('search', function() {
        it('should not find the user1 in database', function(done) {
            user.search(user1.username, function(err, res) {
                assert(res.length === 0);
                done();
            })
        });
        it('should find user2 in database', function(done) {
            user.create(user2, function(err, res) {
                user.search(user2.username, function(err, res) {
                    assert(res[0].username === user2.username);
                    user.delete(user2.username, function(err) {
                        if (err) done(err);
                        done();
                    });

                })

            })
        })
    });
    describe('authenticate', function() {
        it("should autheticate user's password with what's created", function(done) {
                user.authenticate(user3.username, user3.password, function(err, res) {
                    assert(res);
                    done();
            });
        });
        it("should fail to authenticate", function(done) {
            user.authenticate(user3.username, user2.password, function(err, res) {
                if (!res) {
                    done();
                } else {
                        done("Password should be incorrect");
                    }
                
            });
        });
    });
