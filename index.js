var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var router = require('./routes/show.js');

//To parse URL encoded data (tutorialspoint.com)
app.use(bodyParser.urlencoded({ extended: false }))
//To parse json data (tutorialspoint.com)
app.use(bodyParser.json())

app.use(session({secret: "Your secret key"}));
app.use(cookieParser());

app.use('/thebank', router);

app.listen(8080);
