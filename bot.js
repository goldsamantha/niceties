// a twitter bot!

var twitterAPI = require('node-twitter-api');
var util = require('util');

var MarkovChain = require('markovchain').MarkovChain
  , quotes = new MarkovChain({ files: [ 'data/lebron_sample.txt', 'data/ulysses_sample.txt', 'data/lebron_sample2.txt', 'data/ulysses_sample2.txt']  })


function generateTweet() {
  quotes
    .start('Heat') //
    .end(10)
    .process(function(err, s) {
      if (s.toString().length < 140){

        //
        // new Promise(function(resolve, reject) {
        //
        //   var res =   quotes
        //       .start('Heat') //
        //       .end(10)
        //       .process(function(err, s) {
        //         resolve(s)
        // });


        main(s);
        // console.log(s)
        // return s;
      }
    });
}

generateTweet();
// console.log(generateTweet());

function main(s) {
    var accessToken = process.argv[4];
    var tokenSecret = process.argv[5];

    var twitter = new twitterAPI({
        consumerKey: process.argv[2],
        consumerSecret: process.argv[3]});
    console.log(s);
    twitter.statuses("update",
        {"status": s}, //generateTweet()},
        accessToken,
        tokenSecret,
        function(error, data, response) {
            if (error) {
                console.log("something went wrong: " + util.inspect(error));
            }
        }
    );
}

// main();
