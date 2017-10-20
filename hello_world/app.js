// create a server using http module
var http = require('http');

var server = http.createServer(function(request, response){
  response.writeHead(200, {"Content-Type": "text/plain"});

  response.end("Hello World");
});

server.listen(3002);

console.log("The server is running on port 3002...");
