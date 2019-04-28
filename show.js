var contentMap = require('./contentMap');
var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "jeffjack",
  database: "thebank"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

router.get('/', function(req, res){
   res.send('GET route on things.');
});

router.post('/', function(req, res){
   res.send('POST route on things.');
});

router.get('/login', function(req, res){
   res.sendFile(path.join(__dirname + '/html/login.html'));
});

router.post('/login', function(req, res, next){
  console.log(req.body);
  var userName = req.body.loginData[0].value;
  var password = req.body.loginData[1].value;
  console.log("Username: " + userName + ", password: " + password);
  if(userName == 'system' && password == 'syst3m'){
    console.log('login success');
    res.sendFile(path.join(__dirname + '/html/home.html'));
  }
  else{
    res.send('Invalid credentials');
  }
});

router.use('/home', function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    var query = "SELECT COUNT(idUser) AS exist, username, password, firstName FROM users";
    query = query + " WHERE username = '"+username + "' AND password = '" + password + "'";

    con.query(query,
      function (err, result, fields) {
        if(err){
          throw err;
        }
        if(result[0].exist !== 0){
          console.log('login success');
          res.cookie('username', result[0].username);
          res.cookie('firstName', result[0].firstName);
          next();
        }
        else{
          res.redirect('login?loginError'); //invalid credentials
        }
    });
});

router.post('/home', function(req, res){
   res.sendFile(path.join(__dirname + '/html/home.html'));
});

router.get('/getAccounts', function(req, res){
  var query = "SELECT a.name, a.amount from account a ";
  query = query + "INNER JOIN users u ON u.iduser = a.iduser WHERE a.iduser = 1";

  con.query(query,
    function (err, result, fields) {
      if(err){
        throw err;
      }
      else{
        console.log(result);
        res.send(result);
      }
    });
});



module.exports = router;
