var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var crypto = ('crypto-js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var dbUrl = "mongodb://Tohoma:Knight21$@ds157987.mlab.com:57987/parkit_users"
var bodyParser = require("body-parser");

var sampleValidation = {
    "login": true
}

var UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    uid: {
        type: Schema.Types.ObjectId,
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

var LotSchema = new Schema({
    x: {
        type: Number,
        required: true
    },
    y: {
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
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

var User = mongoose.model('User', UserSchema);

db.on('error', function() {
    console.log("Whhoooopps Something went wrong");
});

var addUser = function(username, password, carPic, make, licensePlate, cardNumber, expDate, nameOnCard, CVV) {
    mongoose.connect(dbUrl, function(err) {
        if (err) {
            console.log("Connection problem " + err);
        }

        console.log("We have connected");

        var user = new User({
            username: username,
            password: password,
            carPic: carPic,
            make: make,
            licensePlate: licensePlate,
            cardNumber: cardNumber,
            expDate: expDate,
            nameOnCard: nameOnCard,
            CVV: CVV
        });

        user.save(function(error, data) {
            if (error) {
                console.dir(error)
            } else {
                console.log(data)
            }
        })
        db.close;

    })
}

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send("Hello World!");
});

app.get('/login', function(req, res) {
    //TODO: login
    res.status(200).json(sampleValidation);
});

app.post('/register', function(req, res) {
	//TODO: create better fail messages and responses
	var username = req.body.username.toLowerCase();
	var password = req.body.password;
	var carPic = req.body.carPic || "none";
	var make = req.body.make || "none";
	var licensePlate = req.body.licensePlate || "none";
	var cardNumber = req.body.cardNumber || 0;
	var expDate = req.body.expDate || "none";
	var nameOnCard = req.body.nameOnCard || "none";
	var CVV = req.body.CVV || 0;

    addUser(username, password, carPic, make, licensePlate, cardNumber, expDate, nameOnCard, CVV);
    res.status(200).json(req.body);
});

app.get('/lots', function(req, res) {
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
    var calculatePrice = function(time) {
        //TODO
    }
});

app.post('/registerlot', function(req, res) {
    //TODO: register lot
    res.status(200).json(req.body);
});

app.listen(PORT, function() {
    console.log("Server running on PORT 3000")
})