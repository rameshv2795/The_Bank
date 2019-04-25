var fs = require('fs');

var contentMap = {
  '/' : '<h1>Bank Home</h1>',
  '/profile' : '<h1>Welcome Vinod Ramesh</h1>'
};

fs.readFile('html/test.html', 'utf8', function(err, contents) {
    contentMap['/w3temp'] = contents;
});
fs.readFile('html/login.html', 'utf8', function(err, contents) {
    contentMap['/login'] = contents;
});

exports.contentMap = contentMap;
