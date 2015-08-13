var express = require('express');
var router = express.Router();
var generator = require('../generate_quote');



/* GET home page. */
router.get('/', function(req, res, next) {

  generator.getTweetSingleCorpus('data/tom.txt', function(tweet) {
    res.render('index', { title: tweet });
  });
});

module.exports = router;
