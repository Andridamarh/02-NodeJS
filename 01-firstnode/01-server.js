const http = require('http');

const port = process.env.PORT || 3001;

// http server handle request (req) from browser
// res => response
const server = http.createServer(function(req,res){
    res.end("Hi bootcamp code.id");
})

server.listen(port);

console.log(`Server listening on port ${port}`);