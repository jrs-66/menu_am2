'use strict';

var express = require('express');
var router = express.Router();

var controller = require('./oauth.controller');

router.get('/return*', controller.authorize);

module.exports = router;
