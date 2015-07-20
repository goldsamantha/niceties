// a twitter bot!

var twitterAPI = require('node-twitter-api');
var util = require('util');

var MarkovChain = require('markovchain').MarkovChain
  , quotes = new MarkovChain({ files: [ 'data/lebron_sample.txt', 'data/ulysses_sample.txt', 'data/lebron_sample2.txt', 'data/ulysses_sample2.txt']  })


// function choice(list) {
//     return list[Math.floor(Math.random() * list.length)];
// }

// function generateTweet() {
//     var meat = ["beef", "turkey", "veggie", "tofu", "black-bean", "buffalo"];
//     var cheese = ["swiss", "gouda", "cheddar", "monterey jack", "brie"];
//     var bun = ["brioche", "sesame-seed", "whole wheat"];
//     var toppings = ["lettuce", "red onion", "tomatoes"];
//     var condiments = ["mustard", "ketchup", "mayo", "sriracha",
//         "garlic aioli"];
//     return "a " + choice(meat) + " burger with " + choice(cheese) + ", " +
//         choice(toppings) + " and " + choice(condiments) + " on a " +
//         choice(bun) + " bun";
// }

function generateTweet() {
  quotes
    .start('Heat') //
    .end(10)
    .process(function(err, s) {
      if (s.toString().length < 140){
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
