const http = require('http');
const url = require('url');
var contentMap = require('./contentMap');
var show = require('./show');

const onRequest = (request, response) => {
  var pathName = url.parse(request.url).pathname;
  show.showPage(response, pathName);
}

const server = http.createServer(onRequest);

server.listen(8080, (err) => {
  if (err) {
    return console.log('Error: ', err)
  }
  console.log('Listening on 8080');
});
