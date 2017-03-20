const express = require('express'),
    router = express.Router(),
    user = require('../models/user')

router.post('/register', function(req, res) {
	console.log(req.body);
    let user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    if (req.body.streetaddress) {
        user.streetaddress = req.body.streetaddress
        user.apt = req.body.apt
        user.city  = req.body.city
        user.state = req.body.state
        user.zipcode = req.body.zipcode
    }

    user.create(user, function(err, id) {
    	if (err) {res.status(500).json({error: true})
    } else { res.status(200).json({error: false})}
    })
});

router.get('/address', function(req, res) {
    if(req.body.username) {
        res.status(500).json({error: true, message: "get by username is not implemented yet"})
    } else{
        user.getAllAddresses
    }
})

router.post('/login', function(req, res) {
    let username = req.body.username,
        password = req.body.password;
    user.authenticate(username, password, (err, result) => res.status(200).json({result: result}))
})

router.get('/', function(req,res) {
	res.send("Hello!");
})

module.exports = router;