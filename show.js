var contentMap = require('./contentMap');
var express = require('express');
var router = express.Router();
var path = require('path');
var con = require('./config/db.js');


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

    var query = "SELECT COUNT(idUser) AS exist, username, password, firstName, iduser FROM users";
    query = query + " WHERE username = '"+username + "' AND password = '" + password + "'";

    con.query(query,
      function (err, result, fields) {
        if(err){
          throw err;
        }
        if(result[0].exist !== 0){
          console.log('login success');
          req.session.user = result[0].iduser;
          res.cookie('username', result[0].username);
          res.cookie('firstName', result[0].firstName);
          console.log('HERE');
          res.sendFile(path.join(__dirname + '/html/home.html'), {id: req.session.user});
        }
        else{
          res.redirect('login?loginError'); //invalid credentials
        }
    });
});

router.use('/getAccounts', isValidUser, function(req, res, next){

  var query = "SELECT a.name, a.amount from account a ";
  query = query + "INNER JOIN users u ON u.iduser = a.iduser WHERE a.iduser = ";
  query = query + req.session.user;
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

function isValidUser(req, res, next){
   if(req.session.user){
      next();
   }
   else{
      var err = new Error("You aren't logged in!");
      console.log('session error');
      res.redirect('login');
   }
}
module.exports = router;
