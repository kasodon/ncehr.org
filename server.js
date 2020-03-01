/*
const http = require('http');
const port = process.env.PORT || 5000;
var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
app.use(express.static('views'));


const server = http.createServer((req, res) => {

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('views/index.html');

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



const express = require('express');
const path = require('path');
const sendMail = require('./mail');
const PORT = process.env.PORT || 5000;
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const log = console.log;

express()
  .use(express.static(path.join(__dirname, 'views')))
  .use(bodyParser.urlencoded({extended: true}))
  // Data parsing
  .use(express.urlencoded({extended: false }))
  .use(express.json())
  .post('/email', (req, res) => {
    const { name, email, subject, text } = req.body
    console.log('Data: ', req.body)
    sendMail(name, email, subject, text, function(err, data){
      if(err) {
        res.status(500).json({ message: 'internal error' })
      } else {
        res.json({ message: 'Message Sent!!!!' })
      }
    })
 
  })
  .set('views', path.join(__dirname, 'views'))
  .engine('html', require('ejs').renderFile)
  .set('view engine', 'html')
  .get('/', (req, res) => res.render('index'))
  .get('/about', (req, res) => res.render('about'))
  .get('/individual', (req, res) => res.render('individual'))
  .get('/institution', (req, res) => res.render('institution'))
  .get('/steering', (req, res) => res.render('steering'))
  .get('/contact', (req, res) => res.render('contact'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  



