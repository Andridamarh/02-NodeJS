// create basic routing

const fs = require('fs');
const http = require('http');
const port = process.env.PORT || 3001;


const server = http.createServer(function(req,res){
    if(req.url === "/") return responseText(req,res);
    if(req.url === "/json") return responseJson(req,res);
    if(req.url.match(/^\/static/)) return responseStatic(req,res);

    responseNotFound(req,res)
})

function responseText(req,res){
    res.setHeader("Content-Type","text/plain");
    res.end("Hi Bootcamp")
}

function responseJson(req,res){
    res.setHeader("Content-Type","application/json");
    res.end(JSON.stringify({
        batch : "Batch#12",
        bootcamp : ["JS","ReactJS"]
    }))
}

function responseNotFound(req,res){
    res.writeHead(404,{"Content-Type" : "text/plain"});
    res.end("Not Found");
}

function responseStatic(req,res){
    const fileName = `${__dirname}/public${req.url.split(`/static`)[1]}`
    fs.createReadStream(fileName)
        .on("error",()=> responseNotFound)
        .pipe(res);
}

server.listen(port);

console.log(`Server listening on port ${port}`);