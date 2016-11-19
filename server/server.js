var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var sampleValidation = {"login" : true}
var crypto = ('crypto-js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

var userSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	uid: {
		type: Scema.Types.ObjectId,
		ref: 'user'
	},
	carImage: {
		type: String,
		required: false,
		default: 'images/car.png'
	},
	make: {
		type: String,
		required: false
	},
	licensePlate: {
		type: String,
		required: false
	},
	cardNumber: {
		type: Number,
		required: false
	},
	expDate: {
		type: String,
		required: false
	},
	nameOnCard: {
		type: String,
		required: false
	},
	CVV: {
		type: Number,
		required: false
	}
});

var lotSchema = new Schema({
	x : {
		type: Number,
		required: true
	},
	y : {
		type: Number,
		required: true
	},
	checkedIn: {
		type: Boolean,
		required: true
	},
	time: {
		type: Date,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	uid: {
		type: Scema.Types.ObjectId,
		ref: 'user'
	}
})

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
