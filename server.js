/*
const http = require('http');
const port = process.env.PORT || 5000;
var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/public/';
app.use(express.static('public'));


const server = http.createServer((req, res) => {

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('index.html');
});

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

server.listen(port,() => {
  console.log(`Server running at port `+port);
});
*/

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('public', path.join(__dirname, 'public'))
  .get('/', (req, res) => res.render('public/index'))
  .get('/about', (req, res) => res.send('public/about.html'))
  .get('/individual', (req, res) => res.send('public/individual.html'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))