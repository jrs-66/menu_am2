'use strict';

var express = require('express');
var router = express.Router();

var controller = require('./templates.controller');

router.get('/', controller.list);
router.delete('/:id', controller.delete);
router.get('/:id', controller.details);
router.post('/', controller.add);

module.exports = router;
