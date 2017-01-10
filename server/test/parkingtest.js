var parker = require('../models/parker');
var user1 = {username:"Sample",password:"123"}
describe('Parker', function (){
	describe('create', function() {
		it('should register account in database', function(done) {
			parker.create(user1, function(err) {
				if(err) done(err);
				else done();
			});

		});
	});
	describe('delete', function() {
		it('should delete user account in database', function(done) {
			parker.delete(user1.username, function(err) {
				if(err) done(err);
				else done();
			})
		})
	});
	describe('search', function () {
		it('should not find the user1 in database', function(done) {
			parker.search(user1.username, function(err,res) {
				assert(res.length === 0);
			})
		})
	})
});