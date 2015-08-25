/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var fs = require('fs');
var http = require('http');
var https = require('https');
var path = require('path');

var credentials = {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'webserver.nopass.key').toString())
  , cert: fs.readFileSync(path.join(__dirname, 'cert', 'newcert.pem').toString())
}

var express = require('express');
var config = require('./config/environment');
var app = module.exports = express();
var server = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var assert = require('assert');
var mongo = require('mongodb');
var monk = require('monk');
//var db = monk('web:web@localhost:27017/menu');
var db = monk('web:web@localhost:6666/menu');

// Make  db accessible to router
app.use(function(req,res,next){
  req.db = db;
  req.appPath = app.get('appPath');
  next();
});

 app.use(function (req, res, next) {
      //if (err) console.log(err);
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
   next();
 });

//var router = require('socket.io-events')();

var sio = require('socket.io')(server);

app.use(function(req, res, next) {
  req.io = sio;
  next();
});

require('./config/express')(app);

sio.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('message', function(msg){
    console.log('message: ' + msg);
  });
  socket.on('command', function(data) {
    console.log("emitting type - " + data.type);
    socket.emit(data.type, data);
  })
  socket.emit('connectaa', {'message': 'this is my messsgare'});
});
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});
//httpsServer.listen(443, config.ip, function () {
//  console.log('Express server listening on https: %d, in %s mode', 443, app.get('env'));
//});

// Expose app
exports = module.exports = app;
