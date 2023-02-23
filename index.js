const http = require("http");
const fs = require("fs");
var url = require("url");
const host = 'localhost';
const port = 8080;
const requestListener = function(request,response){
var pathname = url.parse(request.url).pathname;
console.log("Request for " + pathname + " received.");
response.writeHead(200);
if(pathname == "/esp") {
html = fs.readFileSync("esp.html", "utf8");
response.write(html);
} else if (pathname == "/esp.js") {
script = fs.readFileSync("esp.js", "utf8");
response.write(script);
}
else if(pathname == "/chat") {
    html = fs.readFileSync("chat.html", "utf8");
    response.write(html);
}
else if(pathname == "/chat.js") {
    script = fs.readFileSync("chat.js", "utf8");
    response.write(script);
}
response.end();
}
const server = http.createServer(requestListener);
server.listen(port,host,() =>{
console.log(`Server is running on http://${host}:${port}`);
});
