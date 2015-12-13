var express = require('express');
var fs = require('fs');
var app = express();
var http = require('http');
var path = require('path');
//var jade = require('jade');

var connect = require('./grunt/connect');
var port = connect.server.options.port;

// Serve static CSS files
app.use('/build/styles', express.static(__dirname + '/build/styles'));

// Serve static JS files
app.use('/build/js', express.static(__dirname + '/build/js'));

// Serve static image files
app.use('/build/images', express.static(__dirname + '/build/images'));

app.set('models', path.join(__dirname, './src/models/'));

app.set('views', path.join(__dirname, './src/views/'));
console.log(path.join(__dirname, './src/views/'));
app.set('view engine', 'jade');

console.log('path of views');
console.log(app.get('models'));

//var data = require(app.get('models') + 'home.json');


/*
app.use('/', function(req, res, next){
      res.render("home");
});
*/

// dynamically include routes (Controller)
fs.readdirSync('./src/controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./src/controllers/' + file);
      route.controller(app);
  }
});

var server = app.listen(port, function(){
	var host = server.address().address;
      var port = server.address().port;

      console.log('Example app listening at http://%s:%s', host, port);
})

//module.exports = app;