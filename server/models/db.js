require('dotenv').load();
var mysql = require("mysql");


var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "users"
});

con.open = function() {con.connect(function(err) {
    if (err) {
        //console.log('Error connecting to database');
        return;
    }
    console.log('Connection established');
})
}


con.close = function(err) {
    if (err) {
        console.log("There was an error!");
        console.log(err)
        return;
    }
    console.log("Connecting ending");

};

module.exports = con;

