/**
 * GET     /players             ->  list
 * POST    /players             ->  create
 * GET     /players/:id         ->  show
 * PUT     /players/:id         ->  update
 * DELETE  /players/:id         ->  delete
 */

'use strict';

exports.activate = function(req, res, next) {

  var form = req.body;
  var collection = req.db.get('players');

  collection.findOne({activation_code: form.code.toUpperCase() }, function(err, document){
    if (err || !document) {
      req.io.sockets.emit('message', {'message': "Player not found!"});
      return res.send('not found');
    }

    collection.update(
      { activation_code : form.code.toUpperCase() },
      { $unset: { activation_code : 1 },
      $set: {name: form.name, merchant_id: 'my_id'} },
      function(err, result) {
        if (err) return next(err);

        req.io.sockets.emit('activation_' + document._id, {'activation': 'success'});
        req.io.sockets.emit('message', {'message': "Player added!"});

        document.name = form.name;
        res.send(document);
      }
    );

  });
};

exports.list = function(req, res, next) {
  var collection = req.db.get('players');

  collection.find({ merchant_id : 'my_id' }, function(err, cursor) {
    if (err) return next(err);

    req.io.sockets.emit('player_list', cursor);
    res.send(cursor)
  });
};

exports.delete = function(req, res, next) {
  var playerid = req.params.id;

  var collection = req.db.get('players');
  collection.remove({ _id : playerid }, function(err, result) {
    if (err) return next(err);

    req.io.sockets.emit('player_delete', {'_id': playerid});
    req.io.sockets.emit('message', {'message': "Player has been removed."});

    res.send("success");
  });
}

exports.update = function(req, res, next) {
  var form = req.body;
  var collection = req.db.get('players');

  if (form._id) {
    var player_id = form._id;
    collection.update(
      { _id : player_id },
      {$set: {name: form.name, template_id: form.template_id}},
      function(err, count) {
        if (err) return next(err);
        if (count) {
          console.log("player template association changed");
          var collection = req.db.get('templates');
          collection.findOne({_id: form.template_id}, function(err, document) {
            console.log("found template " + form.template_id + " for player " + player_id);
            req.io.sockets.emit('player_' + player_id , {player_id: player_id, update: count});
            req.io.sockets.emit('template_change_' + player_id, {player_id: player_id, template: document});
            req.io.sockets.emit('message', {message: "Player has been updated."});
          });

        }
        res.send(form);
      }
    );
  };
}

exports.template_assign = function(req, res, next) {

  var playerid = req.body._id;
  var template_id = req.body.template_id;

  var collection = req.db.get('players');
  collection.update({_id : playerid}, {$set: {template_id: template_id}}, function(err, count) {
    if (err) return next(err);

    req.io.sockets.emit('template_change', {template_id: template_id});
    req.io.sockets.emit('message', {'message': "Template has been assigned."});
    res.send("update success");
  });

}
