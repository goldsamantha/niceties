var express = require('express');
var router = express.Router();
var generator = require('../generate_quote');
var _ = require('lodash')

var fs = require('fs');

function getStaff() {
  return _.map(fs.readdirSync('./data'), function(filename) {
    return /(.*).txt/.exec(filename)[1];
  });
}

/* GET home page. */
router.get('/:name', function(req, res, next) {
  var staff = getStaff()
  console.log(staff);
  if (_.contains(staff, req.params.name)) {
    generator.getTweetSingleCorpus('data/' + req.params.name + '.txt', function(salt) {
      // a salt is actually a nice tie
      console.log(req.type)
      console.log(req.headers)
      res.type('application/json');
      res.send({ name: req.params.name, nicetie: salt });
    });
  } else {
    res.status(500);
    res.send('eep');
  }
});


module.exports = router;
