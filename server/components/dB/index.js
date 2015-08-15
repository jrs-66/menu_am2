var mongodb = require('mongodb');
var events = require('events');
var event = new events.EventEmitter();
var access =
var client = null;

new mongodb.Db('menu', access, { safe: true, auto_reconnect: true }).open(function (err, c) {
  console.log('db connect6');
  if (!err) {
    client = c;
    console.log('database menu connected');
    event.emit('connect');
  } else {
    console.log('database connection error', err);
    event.emit('error');
  }
});

exports.insertx = function(collectionName, fn) {
  if(client) {
    var collection = db.collection(collectionName);
    fn(client);
  } else {
    event.on('connect', function() {
      var collection = db.collection(collectionName);
      fn(client);
    });
  }
};

exports.getx = function(fn) {
  if(client) {
    fn(client);
  } else {
    event.on('connect', function() {
      fn(client);
    });
  }
};
