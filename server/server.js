 var WebSocketServer = require("websocket").server;
 var http = require('http');
 var MessageHandler = require("./MessageHandler.js");

 var drawServer;
 var PORT = 6001;

 var httpServer = http.createServer(function(request, response){
 	console.log((new Date()) + ' Received request for ' + + request.url);
    response.writeHead(404);
    response.end();
 });

httpServer.listen(PORT, function() {
    console.log((new Date()) + ' Server is listening on port:' + PORT);
});


drawServer = new WebSocketServer({
    httpServer: httpServer,
    // You should not use autoAcceptConnections for production 
    // applications, as it defeats all standard cross-origin protection 
    // facilities built into the protocol and the browser.  You should 
    // *always* verify the connection's origin and decide whether or not 
    // to accept it. 
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed. 
  return true;
}

drawServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin 
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    
    var connection = request.accept('draw-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');


    connection.on('message', function(message) {

    	
        if (message.type === 'utf8') {
            //connection.sendUTF(message.utf8Data);
            MessageHandler.handleUTF8(message.utf8Data, connection);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});