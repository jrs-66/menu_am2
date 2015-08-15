/**
 * GET     /templates              ->  index
 * POST    /templates              ->  create
 * GET     /templates/:id          ->  show
 * PUT     /templates/:id          ->  update
 * DELETE  /templates/:id          ->  destroy
 */

'use strict';

exports.list = function(req, res, next) {
  var collection = req.db.get('templates');
  collection.find({},{},function(err, records){
	
    if (err) {
	console.log(err);
	return next(err);
    }

    res.json(records);
  });
};

exports.details = function(req, res) {
  console.log("DETAILS");
  var collection = req.db.get('templates');
  collection.findOne({_id: req.params.id},{},function(err,docs){
    if (err) return next(err);

    return res.json(docs);
  });
};

exports.add = function(req, res, next) {

  var form = req.body;
  var collection = req.db.get('templates');

  collection.index('name');
  collection.insert({name: form.name, HTML: form.HTML}, function(err, records) {
    if (err) {
	console.log(err);
	return next(err);
    }
    req.io.sockets.emit('message', {'message': "Template has been added."});
    req.io.sockets.emit('template_add', {'template': records});
    return res.json(records);
  });
}

exports.delete = function(req, res, next) {
  var templateid = req.params.id;

  var collection = req.db.get('templates');
  collection.remove({ _id : templateid }, function(err, result) {
    if (err) return next(err);
    req.io.sockets.emit('message', {'message': "Template has been removed."});
    req.io.sockets.emit('template_delete', {'_id': templateid});
    return res.send("success");
  });
}
