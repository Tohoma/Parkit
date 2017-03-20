let db = require('./db');
let crypto = require('crypto');

exports.getAllAddresses = function(callback) {
    db.open();
    db.query('SELECT id, username, streetaddress, apt, city, state, zipcode FROM parkers'), function(err, res) {
        if (err) {
            callback(err)
        } else {
            callback(null, res);
        }
    }
}

exports.getAddressByUsername = function(username, callback) {
	db.open();
	db.query('SELECT id, streetaddress, apt, city, state, zipcode FROM parkers WHERE username = ?', username, err)
}