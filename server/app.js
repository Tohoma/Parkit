var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');


// app.engine('jade', require('jade').__express)
// app.set('view engine', 'jade')

app.use(express.static(__dirname + '/public'))
//app.use(require('./middlewares/users'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./controllers'))

app.listen(3000, function() {
    console.log("App running on port 3000")
})