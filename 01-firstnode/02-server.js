const http = require('http');

const port = process.env.PORT || 3001;

// http server handle request (req) from browser
// res => response
const server = http.createServer(function(req,res){
    res.setHeader("Content-Type","application/json");
    res.end(JSON.stringify({
        batch : "Batch#12",
        bootcamp : ["JS","ReactJS"]
    }))
})

server.listen(port);

console.log(`Server listening on port ${port}`);