require('dotenv').load();
var mysql = require("mysql");


var con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS
});

con.connect(function(err){
	if(err) {
		console.log('Error connecting to database');
		return;
	}
	console.log('Connection established');
});

con.end(function(err){
	if (err) {
	console.log(err)
	console.log("There was an error!");
	return;
	}
	console.log("Connecting ending");
	
 })