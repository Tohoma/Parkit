const express = require('express')
, router = express.Router()
, Parker = require('../models/parker')

router.use('/parker', require("./parker"))

router.get('/' function(req, res){
	res.send("hello world");
});

module.exports = router
