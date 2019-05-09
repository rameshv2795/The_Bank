var path = require('path');
var con = require('../config/db.js');

module.exports = {
    useGetAccounts : function(req, res){
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
    }
}
