var express = require('express');
var router = express.Router();
var generator = require('../generate_quote');
var _ = require('lodash')

var fs = require('fs');

function getStaff() {
  return {
    dave_albert: {
      name: 'Dave Albert',
      img: 'https://d29xw0ra2h4o4u.cloudfront.net/assets/people/david_albert_150-0f64de6001c6a96e367d64401a6d171221d4e5af702b8e210a3cb91e7c31acdb.jpg'
    },
    mary_rose_cook: {
      name: 'Mary Rose Cook',
      img: 'https://d29xw0ra2h4o4u.cloudfront.net/assets/people/mary_rose_cook_150-bf26e8e8d8a3e268769cc808724c521c8dff11c778bac92f020a64cb50136646.jpg'
    },
    nick_bergson_shilcock: {
      name: 'Nick Bergson-Shilcock',
      img: 'https://d29xw0ra2h4o4u.cloudfront.net/assets/people/nick_bergson-shilcock_150-b8199afeb2ad95f104479b871218ad552bd7b23d26917dfc5b2242661107b78a.jpg'
    },
    rachel_vincent: {
      name: 'Rachel Vincent',
      img: 'https://d29xw0ra2h4o4u.cloudfront.net/assets/people/rachel_vincent_150-721478ea579ac58fd8dffda7530f962fd9d8e6b94bdb5d2365585f12cac14a96.jpg'
    },
    sonali_sridhar: {
      name: 'Sonali Sridhar',
      img: 'https://d29xw0ra2h4o4u.cloudfront.net/assets/people/sonali_sridhar_150-a2fcfd756d8da32da913af8785ff11dae6d03c55f76247abf2e154eb20ff1ae2.jpg'
    },
    tom_ballinger: {
      name: 'Tom Ballinger',
      img: 'https://d29xw0ra2h4o4u.cloudfront.net/assets/people/thomas_ballinger_150-3732f40d161e59200ab35d5005c7a13dbeb44782f9c7533cbd62a5f499c0efa7.jpg'
    },
    zach_allaun: {
      name: 'Zach Allaun',
      img: 'https://d29xw0ra2h4o4u.cloudfront.net/assets/people/zach_allaun_150-2d10542f232cdf7594a47e802cd1e081ad298164593eac7a6e94cc881b66a17e.jpg'
    }
  };
}

router.get('/staff', function(req, res, next) {
  res.type('application/json');
  res.send(getStaff());
});

router.get('/:name', function(req, res, next) {
  var staff = getStaff()
  if (_.contains(_.keys(staff), req.params.name)) {
    generator.getTweetSingleCorpus('data/' + req.params.name + '.txt', function(salt) {
      // a salt is actually a nice tie

      var peep = staff[req.params.name]
      var data = {
        name: peep.name,
        img: peep.img,
        nicetie: salt
      };

      res.type('application/json');
      res.send(data);
    });
  } else {
    res.status(500);
    res.send('eep');
  }
});


module.exports = router;
