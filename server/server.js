var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var sampleValidation = {"login" : true}

app.get('/', function(req,res){
	res.send("Hello World!");
});

app.get('/login', function(req, res) {
	//TODO: login
	res.status(200).json(sampleValidation);
});

app.post('/register', function(req,res) {
	//TODO: register
	res.status(200).json(req.body);
});

app.get('/lots', function(req,res) {
	//TODO: figure out sample data
});

app.post('/reserve', function(req, res) {
	//TODO: figure out object structure
});

app.post('/checkin', function(req, res) {
	//TODO: figure out object structure
});

app.post('/checkout', function(req, res) {
	//TODO: figure out object structure
	var calculatePrice = function (time) {
		//TODO
	}
});

app.post('/registerlot', function(req, res) {
	//TODO: register lot
	res.status(200).json(req.body);
});

app.listen(PORT, function(){console.log("Server running on PORT 3000")})
