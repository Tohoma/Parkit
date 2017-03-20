const express = require('express')
, router = express.Router()
, user = require('../models/user')

router.use('/user', require("./user"))

router.get('/', function(req, res){
	res.send("hello world");
});

module.exports = router
