const express = require('express');
const fs = require("fs");
const port = process.env.PORT || 3001

const app = express();

// create basic routing
app.get("/", responseText);
app.get("/json", responseJson);
app.get("/static/*", responseStatic);
app.get("*",responseNotFound);

app.listen(port, ()=> console.log(`Server is listening on port ${port}`));

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