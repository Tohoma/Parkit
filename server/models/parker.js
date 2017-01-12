//Refactor everything into a single module.exports since search function is needed.
let db = require('./db');
let crypto = require('crypto');


let hash = function(password, salt) {
    return crypto.createHmac('sha512', salt).update(password).digest('hex');
}

exports.create = function(parker, callback) {
    db.open();
    parker.password = hash(parker.password, parker.password + parker.username + parker.password);
    db.query('INSERT INTO parkers SET ?', parker, function(err, res) {
        if (err) callback(err);
        callback(null, res.insertID);
    });
};

exports.delete = function(username, callback) {
    db.open();
    db.query('DELETE FROM parkers WHERE username = ?', username, function(err, res) {
        //db.end(db.close);
        if (err) callback(err);
        callback(null, res.affectedRows);

    })
};

exports.search = function(username, callback) {
    db.open();
    db.query('SELECT * FROM parkers WHERE username = ?', username, function(err, res) {
        if (err) callback(err);
        callback(null, res);
    })
}