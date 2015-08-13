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

var names = {
  dave_albert: 'Dave Albert',
  mary_rose_cook: 'Mary Rose Cook',
  nick_bergson_shilcock: 'Nick Bergson-Shilcock',
  rachel_vincent: 'Rachel Vincent',
  sonali_sridhar: 'Sonali Sridhar',
  tom_ballinger: 'Tom Ballinger',
  zach_allaun: 'Zach Allauan'
};

/* GET home page. */
router.get('/:name', function(req, res, next) {
  var staff = getStaff()
  console.log(staff);
  if (_.contains(staff, req.params.name)) {
    generator.getTweetSingleCorpus('data/' + req.params.name + '.txt', function(salt) {
      // a salt is actually a nice tie
      console.log(req.type)
      console.log(req.headers)
      var data = {
        name: names[req.params.name] || req.params.name,
        nicetie: salt
      };

      // if (req.accepts('application/json')) {
      res.type('application/json');
      res.send(data);
    });
  } else {
    res.status(500);
    res.send('eep');
  }
});


module.exports = router;
