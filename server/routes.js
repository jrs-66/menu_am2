/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

   app.use('/api/templates', require('./api/templates'));
   app.use('/api/players', require('./api/players'));
   app.use('/oath', require('./oauth'));

   app.use(function(err, req, res, next) {
     console.error(err.stack);
     res.status(500).send('Something broke!');
   });

   // All undefined asset or api routes should return a 404
   app.route('/:url(api|auth|components|app|scripts|bower_components|assets)/*')
    .get(errors[404]);

   //app.route('/oath/return*')
  //  .get(function(req, res) {
  //    require('./api/oauth')(req);
  //    res.send('oauth token');
  //   });

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
