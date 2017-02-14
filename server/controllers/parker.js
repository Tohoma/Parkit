const express = require('express'),
    router = express.Router(),
    Parker = require('../models/parker')

router.post('/register', function(req, res) {
	console.log(req.body);
    let parker = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    Parker.create(parker, function(err, id) {
    	if (err) {res.status(500).json({error: true})
    } else { res.status(200).json({error: false})}
    })
});

router.post('/login', function(req, res) {
    let username = req.body.username,
        password = req.body.password;
    Parker.authenticate(username, password, (err, result) => res.status(200).json({result: result}))
})

router.get('/', function(req,res) {
	res.send("Hello!");
})

module.exports = router;