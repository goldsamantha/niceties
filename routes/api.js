var express = require('express');
var router = express.Router();
var generator = require('../generate_quote');
var _ = require('lodash')


/* GET home page. */
router.get('/:name', function(req, res, next) {
  if (_.contains(['tom', 'mary', 'dave', 'sonali', 'nick', 'zack'], req.params.name)) {
    generator.getTweetSingleCorpus('data/' + req.params.name + '.txt', function(salt) {
      // a salt is actually a nice tie
      res.type('application/json');
      res.send({ nicetie: salt });
    });
  } else {
    res.status(500);
    res.send('eep');
  }
});


module.exports = router;
