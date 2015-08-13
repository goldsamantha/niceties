// a twitter bot!

var twitterAPI = require('node-twitter-api');
var util = require('util');
var async = require('async');




var jjoyce_text = ['data/jjoyce_artist_full.txt', 'data/jjoyce_ulysses_full.txt'];
var lebron_text = [ 'data/lebron_sample.txt', 'data/lebron_sample2.txt'];

var MarkovChain = require('markovchain').MarkovChain
  // , quotes1 = new MarkovChain({ files: [ 'data/lebron_sample.txt', 'data/lebron_sample2.txt']  })
  // , quotes2 = new MarkovChain({ files: [ 'data/ulysses_sample.txt', 'data/ulysses_sample2.txt']  })
  // , quotes = new MarkovChain({ files: [ 'brit_data/bspears_sample.txt', 'brit_data/shakes_sample.txt']  })

  , quotes1 = new MarkovChain({ files:  'brit_data/bspears_sample.txt' })
  , quotes2 = new MarkovChain({ files:  'brit_data/full_shakespeare.txt'})
  , singleCorpus = new MarkovChain({ files:  ['brit_data/bspears_sample.txt','brit_data/full_shakespeare.txt']})

  , rcFac = new MarkovChain({files: 'data/tom.txt'})

  , joyce = new MarkovChain({ files: jjoyce_text})
  , lebron = new MarkovChain({ files: lebron_text})
  , joyce_and_lebron = new MarkovChain({ files: jjoyce_text.concat(lebron_text) });


function getTweetTwoCorpus(corpus1, corpus2, cb) {


  corpus1
  .start(getRandomWordFromList)
  .end(7)
  .process(function(err, s) {
    var s_ls = s.split(" ");
    var last_word = s_ls.slice(s_ls.length-1, s_ls.length)[0];
    var curry = getUseableWord(last_word)

    var prom = new Promise(function(resolve, reject) {
      corpus2
        .start(curry)
        .end(7)
        .process(function(err, s) {
          return resolve(s);
        });


      });
      prom.then(function(result) {
        loc = result.search(last_word)
        var st = "";
        if (loc == 0){
          st = s + result.slice(last_word.length, result.length);
        }
        else {
          st = s+' '+result;
        }
        if (st.length < 140){
          cb(st);
        }
      }, function(err) {
        console.log(err);
      });

    });
}

function getTweetSingleCorpus(corpus, cb) {
  corpus
    .start(getRandomWordFromList)
    .end(40)
    .process(function(err, s) {
      cb(s);

    });
}

function getRandomWordFromList(wordList) {
  var tmpList = Object.keys(wordList);
  var wrd = tmpList[Math.floor(Math.random()*tmpList.length)];
  return wrd;
}

function getUseableWord(word_to_try, wordList) {
  return function(wordList){
    var isInList = (word_to_try in wordList)
    if (isInList){
      return word_to_try;
    }
    var tmpList = Object.keys(wordList);
    var wrd = tmpList[Math.floor(Math.random()*tmpList.length)];
    return wrd;


  };
};

function getWord(word, text) {
  //word is the word to search for and text is the text to look in
  if (text.indexOf(word)> -1){
    return word;
  }
  else{
    return 'the';
  }
}


/*
BRITNEY
*/
// getTweetSingleCorpus(singleCorpus, testMain);
// getTweetTwoCorpus(quotes1, quotes2, testMain);


getTweetSingleCorpus(rcFac, testMain)

// getTweetTwoCorpus(quotes1, quotes2, pushTweet);








/*
LEBRON JAMES JOYCE
*/

// getTweetSingleCorpus(joyce_and_lebron, testMain);
// getTweetTwoCorpus(lebron, joyce, testMain);

// getTweetTwoCorpus(lebron, joyce, pushTweet);






/*


Pushing Function


*/

function testMain(st) {

  console.log("\n************************\n");
  console.log(st);
  console.log("\n************************\n");
}


function pushTweet(s) {
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
