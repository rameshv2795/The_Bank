var express = require('express');
var app = express();
var router = require('./show.js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//To parse URL encoded data (tutorialspoint.com)
app.use(bodyParser.urlencoded({ extended: false }))
//To parse json data (tutorialspoint.com)
app.use(bodyParser.json())

app.use(cookieParser());

app.use('/thebank', router);

app.listen(8080);
