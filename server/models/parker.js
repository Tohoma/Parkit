var db = require('./db');

exports.create = function(parker, callback) {
	db.open();
	db.query('INSERT INTO parkers SET ?', parker, function(err,res){
		//db.end(db.close);
		if(err) callback(err);
		console.log(res);
		callback(null,res.insertID);
	});
};

exports.delete = function(username, callback){
	db.open();
	db.query('DELETE FROM parkers WHERE username = ?', username, function(err,res) {
			db.end(db.close);
			if (err) callback(err);
			callback(null, res.affectedRows);
			
	})
};

// db.open();
// db.query('SELECT * FROM parkers WHERE username = "Sample"', function(err,res) {
// 	console.log(typeof res);
// 	console.log(res);
// 	console.log(res.constructor);
// 	console.log(res === []);
// 	db.end(db.close);
// })


