var express = require('express');
var fs = require('fs');
var app = express();
var http = require('http');
var path = require('path');

var connect = require('./grunt/connect');
var port = connect.server.options.port;

// Serve static CSS files
app.use('/build/styles', express.static(__dirname + '/build/styles'));

// Serve static JS files
app.use('/build/js', express.static(__dirname + '/build/js'));

// Serve static image files
app.use('/build/images', express.static(__dirname + '/build/images'));

app.set('models', path.join(__dirname, './src/models/'));
app.set('modelsInclude', path.join(__dirname, './src/models/include/'));

app.set('helpers', path.join(__dirname, './src/helpers/'));

app.set('views', path.join(__dirname, './src/views/'));
console.log(path.join(__dirname, './src/views/'));
app.set('view engine', 'jade');

// dynamically include routes (Controller)
fs.readdirSync('./src/controllers').forEach(function (file, index) {
  if(file.substr(-3) == '.js') {
      route = require('./src/controllers/' + file);
      route.controller(app);
  }
});

// handle 404 Errors - after all controllers are loaded
var error404 = require('./src/errors/error404')(app);

// log Errors
var errorHandler = require('./src/errors/errorHandler')(app);

var server = app.listen(port, function(){
	var host = server.address().address;
      var port = server.address().port;

      console.log('Example app listening at http://%s:%s', host, port);
})