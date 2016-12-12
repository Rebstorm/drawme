var fs = require("fs");
var path = require('path');

var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};


module.exports.handleFileRequest = handleFileRequest; 


function handleFileRequest(requestPath, response){
    var mimeType = mimeTypes[path.extname(requestPath).split(".")[1]];
    response.writeHead(200, mimeType);

    var fileStream = fs.createReadStream(requestPath);
    fileStream.pipe(response);

}