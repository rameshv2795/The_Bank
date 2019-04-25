const http = require('http');
const url = require('url');

const onRequest = (request, response) => {
  var pathName = url.parse(request.url).pathname;
  showPage(response, pathName);
}

const server = http.createServer(onRequest);

server.listen(8080, (err) => {
  if (err) {
    return console.log('Error: ', err)
  }
  console.log('Listening on 8080');
});

const showPage = (response, pathName) => {
  if(contentMap[pathName]){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(contentMap[pathName]);
    response.end();
  }
  else{
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.write("<h1> 404 -> Page Not Found</h1>");
    response.end();
  }

};

var contentMap = {
  '/' : '<h1>Bank Home</h2>',
  '/profile' : '<h1>Welcome Vinod Ramesh</h2>'
};
