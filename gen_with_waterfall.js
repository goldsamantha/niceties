// a twitter bot!

var twitterAPI = require('node-twitter-api');
var util = require('util');
var async = require('async');

var MarkovChain = require('markovchain').MarkovChain
  // , quotes1 = new MarkovChain({ files: [ 'data/lebron_sample.txt', 'data/lebron_sample2.txt']  })
  // , quotes2 = new MarkovChain({ files: [ 'data/ulysses_sample.txt', 'data/ulysses_sample2.txt']  })
  // , quotes = new MarkovChain({ files: [ 'brit_data/bspears_sample.txt', 'brit_data/shakes_sample.txt']  })

  , quotes1 = new MarkovChain({ files:  'brit_data/bspears_sample.txt' })
  , quotes2 = new MarkovChain({ files:  'brit_data/shakes_sample.txt'})
  , singleCorpus = new MarkovChain({ files:  ['brit_data/bspears_sample.txt','brit_data/shakes_sample.txt']})

function getTweetTwoCorpus(corpus1, corpus2, cb) {


  var ul_str =  "His pace slackened. Here. Am I going to aunt Sara's or not? My consubstantial father's voice. Did you see anything of your artist brother Stephen lately? No? Sure he's not down in Strasburg terrace with his aunt Sally? Couldn't he fly a bit higher than that, eh? And and and and tell us, Stephen, how is uncle Si? O, weeping God, the things I married into! De boys up in de hayloft. The drunken little and his brother, the cornet player. Highly respectable gondoliers! And skeweyed Walter sirring his father, no less! Sir. Yes, sir. No, sir Jesus wept: and no wonder, by Christ!";
  var ul_ls = ul_str.split(' ');
  corpus1
  .start(function(){
      //THIS SHOULD BE ITS OWN FUNCTION
      // var lb_str =  "His pace slackened. Here. Am I going to aunt Sara's or not? My consubstantial father's voice. Did you see anything of your artist brother Stephen lately? No? Sure he's not down in Strasburg terrace with his aunt Sally? Couldn't he fly a bit higher than that, eh? And and and and tell us, Stephen, how is uncle Si? O, weeping God, the things I married into! De boys up in de hayloft. The drunken little and his brother, the cornet player. Highly respectable gondoliers! And skeweyed Walter sirring his father, no less! Sir. Yes, sir. No, sir Jesus wept: and no wonder, by Christ!";
      var lb_str = "I think I decided this morning. I mean, I decided this morning I went day to day. I wake up one morning, it's this team. I wake up another morning, it's this team. And it's a process that I felt it was I may feel like this is the best opportunity for me or not the best opportunity for me.";



      var lb_str = "Baby, can't you see I'm calling A guy like you should wear a warning It's dangerous I'm falling There's no escape I can't wait I need a hit Baby, give me it You're dangerous I'm loving it Too high Can't come down Losin' my head Spinnin' 'round and 'round Do you feel me now? Oh, The taste of your lips I'm on a ride You're toxic I'm slippin' under With a taste of a poison paradise";
      var ls = lb_str.split(" ") //.concat(lb_str.split(" "));
      //console.log(ls);
      // var lb_ls = lb_str.split(" ");
      return ls[Math.floor(Math.random()*ls.length)];
      // return 'the';
    })
    .end(7)
    .process(function(err, s) {
      var s_ls = s.split(" ");
      var last_word = s_ls.slice(s_ls.length-1, s_ls.length);
      var prom = new Promise(function(resolve, reject) {
        corpus2
          .start(getWord(last_word,ul_ls)) //
          .end(7)
          .process(function(err, s) {
            return resolve(s);
          });


      });
      prom.then(function(result) {
        var st = s+' '+result;
        // console.log(s+"\tSPACE\t"+result); // "Stuff worked!"
        if (st.length < 140){
          cb(st);
        }
      }, function(err) {
        console.log(err); // Error: "It broke"
      });

    });
}

function getTweetSingleCorpus(corpus, cb) {




  var ul_str =  "His pace slackened. Here. Am I going to aunt Sara's or not? My consubstantial father's voice. Did you see anything of your artist brother Stephen lately? No? Sure he's not down in Strasburg terrace with his aunt Sally? Couldn't he fly a bit higher than that, eh? And and and and tell us, Stephen, how is uncle Si? O, weeping God, the things I married into! De boys up in de hayloft. The drunken little and his brother, the cornet player. Highly respectable gondoliers! And skeweyed Walter sirring his father, no less! Sir. Yes, sir. No, sir Jesus wept: and no wonder, by Christ!";
  var ul_ls = ul_str.split(' ');
  corpus
    .start(getRandomWordFromList)
    .end(7)
    .process(function(err, s) {
      cb(s);

    });
}

function getRandomWordFromList(wordList) {
  var tmpList = Object.keys(wordList);
  var wrd = tmpList[Math.floor(Math.random()*tmpList.length)];
  return wrd;
}



function getWord(word, text) {
  //word is the word to search for and text is the text to look in
  if (text.indexOf(word)> -1){
    return word;
  }
  else{
    return 'the';
  }
}



getTweetSingleCorpus(quotes2, testMain);
// getTweetSingleCorpus(singleCorpus, testMain);

// getTweetTwoCorpus(quotes1, quotes2, testMain); //, wl1, wl2);








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
