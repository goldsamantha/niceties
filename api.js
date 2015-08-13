var express = require('express');
var http = require('http');

var app = express();

app.listen(3000, function () {
  console.log("Thing app is running at localhost:" + 3000);
});
