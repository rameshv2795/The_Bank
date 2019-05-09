var contentMap = require('../contentMap');
var express = require('express');
var router = express.Router();
var path = require('path');
var con = require('../config/db.js');

var loginR  = require('./loginRoute.js');
var homeR  = require('./homeRoute.js');


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

router.use('/login', loginR.useLogin);

router.use('/home', homeR.useHome);

router.use('/getAccounts', isValidUser, function(req, res, next){

  var query = "SELECT a.idaccount, a.name, a.amount from account a ";
  query = query + "INNER JOIN users u ON u.iduser = a.iduser WHERE a.iduser = ";
  query = query + req.session.user;
  //console.log(query);
  con.query(query,
    function (err, result, fields) {
      if(err){
        throw err;
      }
      else{
        //console.log(result);
        res.send(result);
      }
    });
});

router.use('/getTransactions', isValidUser, function(req, res, next){

  var query = "SELECT * from transactions ";
  query = query + "WHERE idaccount = ";
  query = query + req.body.id;
  query = query + " ORDER BY created DESC LIMIT 3"
  console.log(query);
  con.query(query,
    function (err, result, fields) {
      if(err){
        throw err;
      }
      else{
        console.log("transac: "+ result);
        res.send(result);
      }
    });
});

router.use('/logout', function(req, res){
  req.session.destroy(function(){
    res.redirect('login');
  });
});

function isValidUser(req, res, next){
   if(req.session.user || req.session.user === 0 ){
      next();
   }
   else{
      var err = new Error("You aren't logged in!");
      console.log('session error');
      res.redirect('login');
   }
}
module.exports = router;
