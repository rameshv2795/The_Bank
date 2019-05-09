var path = require('path');

module.exports = {
    useLogin : function(req, res){
      res.sendFile(path.join(__dirname + './../html/login.html'));
    }
}
