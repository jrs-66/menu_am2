'use strict';

//var _ = require('lodash');

exports.authorize = function(req, res) {

  var request = require('request');

  // sample request
  // https://connect.squareup.com/oauth2/authorize?scope=MERCHANT_PROFILE_READ ITEMS_READ EMPLOYEES_READ TIMECARDS_READ&client_id=ZutMYNhQxAFWi0kdZXv-zw&redirect_uri=https://173.48.213.229/oath/return
  request.post(
      'https://connect.squareup.com/oauth2/token',
      { form:
        {
          client_id: 'ZutMYNhQxAFWi0kdZXv-zw',
          redirect_uri: 'https://173.48.213.229/oath/return',
          client_secret: 'b6UlvKLuW75O4jRI4-bTS8T8ZTScabUsXwo-IctYCWk',
          code: req.query.code
        }
      },
      function (error, response, body) {

        if (error) {
          console.log(error);
          res.send('ERROR');
        } else if (!error && response.statusCode == 200) {

          var db = req.db;
          var collection = db.get('accounts');

          collection.index('access_token');
          collection.insert(JSON.parse(body));

          res.sendfile(req.appPath + '/index.html');
          
        } else {
          res.send(response.statusCode);
        }
      }
  );

};
