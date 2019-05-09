var path = require('path');
var con = require('../config/db.js');

module.exports = {
    useTransactions : function(req, res){
      var query = "SELECT * from transactions ";
      query = query + "WHERE idaccount = ? ";
      query = query + " ORDER BY created DESC LIMIT 3"
      console.log(query);
      con.query(query, [req.body.id],
        function (err, result, fields) {
          if(err){
            throw err;
          }
          else{
            console.log("transac: "+ result);
            res.send(result);
          }
        });
    }
}
