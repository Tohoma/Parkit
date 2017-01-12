const express = require('express'),
    router = express.Router(),
    Parker = require('../models/parker')

router.post('/', function(req, res) {
    let parker = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    Parker.create(parker, function(err, id) {
        res.redirect('/';)
    })
})