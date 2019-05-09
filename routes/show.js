var contentMap = require('../contentMap');
var express = require('express');
var router = express.Router();
var path = require('path');
var con = require('../config/db.js');

/*routes*/
var loginR  = require('./loginRoute.js');
var homeR  = require('./homeRoute.js');
var transactionsR = require('./transactionsRoute.js')
var getAccountsR = require('./getAccountsRoute.js')

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

router.use('/getAccounts', isValidUser, getAccountsR.useGetAccounts);

router.use('/getTransactions', isValidUser, transactionsR.useTransactions);

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
