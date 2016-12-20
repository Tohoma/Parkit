console.log("WTF")
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var crypto = ('crypto-js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var dbUrl = "mongodb://Tohoma:Knight21$@ds157987.mlab.com:57987/parkit_users";
var dbUrl2 = "mongodb://Tohoma:Knight21$@ds159237.mlab.com:59237/lot_locations";
var bodyParser = require("body-parser");
var googleAPIKey = "AIzaSyBoVzWxkZsT9HT4gAtH-ll6rYazBaG9Myk";
var request = require('request');
var path = require('path');

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
    address: {
        type: String,
        required: true
    },
    checkedIn: {
        type: Boolean,
        required: false,
        default: false
    },
    time: {
        type: Date,
        required: false,
        default: new Date()
    },
    price: {
        type: Number,
        required: false,
        default: 1.00
    },
    uid: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

var User = mongoose.model('User', UserSchema);
var Lot = mongoose.model('Lot', LotSchema);

db.on('error', function() {
    console.log("Whhoooopps Something went wrong");
});

var addLot = function(address) {
    console.log("Called Add lot");
    mongoose.connect(dbUrl2, function(err) {
        if (err) {
            console.log("Connection problem " + err)
        }
        console.log("We have connected");
        var lot = new Lot({
            address: address
        });
        lot.save(function(error, data) {
            if (error) {
                console.dir(error);
            } else {
                console.log(data);
            }
        })
        db.close();
    })
}

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
        db.close();

    })
}

var login = function(username, password, callback) {
    mongoose.connect(dbUrl, function(err) {
        if (err) {
            console.log("Connection problem " + err);
        }

        console.log("We have connected");
    })
    User.findOne({
        username: username
    }, function(err, user) {
        if (err) {
            console.log(err);
            db.close();
            callback({
                "login": false,
                "error": err
            });
        }
        if (user == null || password !== user.password) {
            console.log("Username and password combination is not right")
            db.close();
            callback({
                "login": false
            })
            return;
        }
        db.close();
        console.log("Wtf!")
        callback(sampleValidation);
        return;
    })

}

var getDistance = function(address1, address2, callback) {
    var origins = "origins=" + address1.split(" ").join("+") + "&";
    var destination = "destinations=" + address2.split(" ").join("+");
    var baseUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&";
    var url = baseUrl + origins + destination + "&key=" + googleAPIKey;
    console.log(url);
    request({
        url: url,
        json: true
    }, function(error, response, body) {
        if (error) {
            callback(error);
        }
        callback(body);
    })
}

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendfile(__dirname +"/public/HomePage.html");
});

app.post('/login', function(req, res) {
    //TODO: login
    var username = req.body.username.toLowerCase();
    var password = req.body.password;
    login(username, password, function(obj) {
        res.status(200).json(obj)
    });
});

app.post('/register', function(req, res) {
    //TODO: create better fail messages and responses. Hash passwords for security.
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

app.post('/lots', function(req, res) {
    //TODO: figure out sample data
    var location = req.body.location;
    var range = req.body.range;
    var results = [];
    mongoose.connect(dbUrl2, function(err) {
        if (err) {
            console.log("Connection problem " + err);
        }

        console.log("We have connected");
    })
    Lot.find({}, function(err, lots) {
        console.log("I got to the lot!")
        if (!err) {
            console.log("Going to find the stuff!");
            //console.log("The lot address is " + lot["._id"]);

        } else {
            console.log(err);
        }
    }).then(function(lots) {
        console.log("I got to the then part");
        lots.forEach(function(lot) {
            console.log(lot.address);
            getDistance(location, lot.address, function(distance) {
            	console.log(distance.rows[0].elements[0].distance.value)
                if (distance.rows[0].elements[0].distance.value < 1609) {
                	console.log("Less than a mile away");
                    results.push(lot);
                }
            })
        })
        
    });
    getDistance("3607 Manhattan Beach Blvd", "1600 Amphitheatre Pkwy, Mountain View", function(result) {
        console.log(result.rows[0].elements[0].distance.value)
    })
    var searchGeoUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key='
    request({
        url: searchGeoUrl + googleAPIKey,
        json: true

    }, function(error, response, body) {
        if (error) {
            console.log(error)
        }
        console.log(body.results[0].geometry.location);
    });
    res.status(200).json(sampleValidation);
});

app.post('/reserve', function(req, res) {
    //TODO
    var uid = req.body.uid;
});

app.post('/checkin', function(req, res) {
    //TODO
    var uid = req.body.uid;
});

app.post('/checkout', function(req, res) {
    var uid = req.body.uid;
    var calculatePrice = function(time) {
        //TODO
    }
});

app.post('/registerlot', function(req, res) {
    //TODO: register lot
    console.log("Posting to register lot");
    var address = req.body.address;
    addLot(address);
    res.status(200).json(req.body);
});

app.listen(PORT, function() {
    console.log("Server running on PORT 3000")
})