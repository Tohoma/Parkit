var db = require('./db');

//TODO hash password.


exports.create = function(parker, callback) {
	db.open();
	db.query('INSERT INTO parkers SET ?', parker, function(err,res){
		if(err) callback(err);
		callback(null,res.insertID);
	});
};

exports.delete = function(username, callback){
	db.open();
	db.query('DELETE FROM parkers WHERE username = ?', username, function(err,res) {
			//db.end(db.close);
			if (err) callback(err);
			callback(null, res.affectedRows);
			
	})
};





