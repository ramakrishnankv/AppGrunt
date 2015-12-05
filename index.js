var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
//var jade = require('jade');

var connect = require('./grunt/connect');
var port = connect.server.options.port;

app.set('views', path.join(__dirname, './src/views/'));
console.log(path.join(__dirname, './src/views/'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, './src/public')));

app.use('/', require('./src/controller/home'));


var server = app.listen(port, function(){
	var host = server.address().address;
      var port = server.address().port;

      console.log('Example app listening at http://%s:%s', host, port);
})

//module.exports = app;