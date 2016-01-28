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
*	var requestHandler = require('requestHandler'); app.use(requestHandler([url1, url2, ....], callback));
*
*	Iterates through a set a urls in an Array and returns Array of JSON Objects as param to the callback function supplied.
**/
var http = require('http');

module.exports = function(urls, callback) {
	console.log(urls instanceof Array);
	return function () {
		console.log('requestHandler : Initialized');
		if (typeof urls === 'object' && urls instanceof Array) {

			var urlCount = 0,
				urlsLength = urls.length,
				responseData = [];

			urls.forEach(function(url, index) {
				var request = http.get(url, function(response) {
					response.setEncoding('utf8');
					response.on('data', function(chunk) {
						console.log(typeof chunk);
						responseData.push(chunk);
					});

					response.on('end', function() {
						urlCount ++;
						if (urlCount == urls.length) {
							//TODO: \n to be replaced to contineu...................
							//req.appPageData = JSON.stringify(responseData);
                            //req.appPageView = pageView;
							console.log('callback');
							console.log(responseData);
                            callback(responseData);
                            //next();
						}

					});
				});
				request.on('error', function(err) {
					// error - Request failed, check the url, http/https is required;
					//next(err);
				});
				//request.end();
			});
		}
		else {
			throw Error('requestHandler Middleware :: expects first parameter an Array');
		}
	};
};