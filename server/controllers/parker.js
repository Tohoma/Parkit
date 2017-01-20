const express = require('express'),
    router = express.Router(),
    Parker = require('../models/parker')

router.post('/', function(req, res) {
	console.log(req.body);
    let parker = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    Parker.create(parker, function(err, id) {
        res.redirect('/');
    })
});

router.get('/', function(req,res) {
	res.send("Hello!");
})

module.exports = router;