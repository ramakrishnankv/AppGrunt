/**
*	Author:	Ramakrishnan K V
*	Date:	26-Jan-2016
*
*	requestHandler - Middleware
*
*	@urls		Array		required
*	@callback	Function	required
*
*	Usage:
*	var requestHandler = require(app.get('helpers') + 'requestHandler')([url1, url2, ....], callback);
*	requestHandler();
*
*	Iterates through a set a urls in an Array and returns Array of JSON Objects as param to the callback function supplied.
*	Handle the logic in the callback function.
**/
var http = require('http');

module.exports = function(urls, callback) {
	return function () {
		if (typeof urls === 'object' && urls instanceof Array) {

			var urlCount = 0,
				urlsLength = urls.length,
				responseData = [];

			urls.forEach(function(url, index) {
				var request = http.get(url, function(response) {
					response.setEncoding('utf8');
					response.on('data', function(chunk) {
						responseData.push(JSON.parse(chunk));
					});

					response.on('end', function() {
						urlCount ++;
						if (urlCount == urlsLength) {
							callback(responseData);
						}
					});
				});
				request.on('error', function(err) {
					// error - Request failed, check the url, http/https is required;
					console.log('error... ' + err);
					throw Error('Please check url');
				});
				//request.end();
			});
		}
		else {
			throw Error('requestHandler Middleware :: expects first parameter an Array');
		}
	};
};