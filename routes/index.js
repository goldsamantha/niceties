var express = require('express');
var router = express.Router();
var generator = require('../generate_quote');
var _ = require('lodash')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'hi' });
});


module.exports = router;
