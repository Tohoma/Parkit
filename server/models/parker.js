var db = require('./db');

exports.create = function(parker, callback) {
	db.query('INSERT INTO parkers SET ?', parker, function(err,res){
		if(err) callback(err);
		db.end(db.close);
		console.log(res);
		callback(null,res.insertID);
	});
};

exports.delete = function(username, callback){
	db.query('DELTE FROM parkers WHERE username = ?', username, function(err,result) {
			if (err) throw err;
			callback(res.affectedRows);
			db.end(db.close);
	})
};



