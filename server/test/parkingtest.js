var parker = require('../models/parker');
var user1 = {username:"Sample",password:"123"}
describe('Parker', function (){
	describe('register()', function() {
		it('should register account in database', function(done) {
			parker.create(user1, function(err) {
				if(err) done(err);
				else done();
			});

		});
	});
});