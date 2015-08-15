'use strict';

var express = require('express');
var router = express.Router();

var controller = require('./players.controller');

router.post('/', controller.activate);
router.delete('/:id', controller.delete);
router.get('/', controller.list);
router.post('/template', controller.template_assign);

module.exports = router;
