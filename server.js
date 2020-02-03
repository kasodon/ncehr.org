const http = require('http');
const port = process.env.PORT || 3000
var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/public/';
app.use(express.static('public'));


const server = http.createServer((req, res) => {

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/about",function(req,res){
  res.sendFile(path + "about.html");
});

router.get("/individual",function(req,res){
  res.sendFile(path + "individual.html");
});

router.get("/contact",function(req,res){
  res.sendFile(path + "contact.html");
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

});

server.listen(port,() => {
  console.log(`Server running at port `+port);
});