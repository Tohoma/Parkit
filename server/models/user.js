//TODO Refactor everything into a single module.exports since search function is needed. -Peyton Cross
let db = require('./db');
let crypto = require('crypto');


let hash = (password, salt) => crypto.createHmac('sha512', salt).update(password).digest('hex');
   

let search = (username, callback) => {
    db.open();
    db.query('SELECT * FROM users WHERE username = ?', username, (err, res) => {
        if (err) callback(err);
        callback(null, res);
    })
}

exports.create = function(newUser, callback) {
    db.open();
    //Cloning object
    let user = (JSON.parse(JSON.stringify(newUser)));
    user.password = hash(user.password, user.password + user.username + user.password);
    db.query('INSERT INTO users SET ?', user, function(err, res) {
        if (err) callback(err);
        callback(null, res.insertID);
    });
};


exports.authenticate = function(username, password, callback) {
    db.open();
    search(username, (err,result) => {
        if(err) callback(err);
        (result.length) ? callback(null,hash(password, password + username + password) === result[0].password) : callback(null, false);
    })
} 

exports.delete = function(username, callback) {
    db.open();
    db.query('DELETE FROM users WHERE username = ?', username, function(err, res) {
        if (err) callback(err);
        callback(null, res.affectedRows);

    })
};

exports.search = search;


