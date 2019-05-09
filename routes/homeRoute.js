var path = require('path');
var con = require('../config/db.js');

module.exports = {
    useHome : function(req, res, next){
      var username = req.body.username;
      var password = req.body.password;

      var query = "SELECT COUNT(idUser) AS exist, username, password, firstName, iduser FROM users";
      query = query + " WHERE username = ? AND password = ?";

      con.query(query, [username, password],
        function (err, result, fields) {
          if(err){
            throw err;
          }
          if(result[0].exist !== 0){
            //console.log('login success');
            req.session.user = result[0].iduser;
            res.cookie('username', result[0].username);
            res.cookie('firstName', result[0].firstName);
            console.log('Session: ' + req.session.user);
            res.sendFile(path.join(__dirname + './../html/home.html'));
          }
          else{
            res.redirect('login?loginError'); //invalid credentials
          }
      });
    }
}
