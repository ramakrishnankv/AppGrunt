module.exports = function(app) {
	return function(req, res, next) {
		var loginModel = {};
    	var user = require(app.get('modelsInclude') + 'user');
    	var names = ['Login'];
    	var page = {};
    	page.title = 'Please Login';
    	loginModel.page = page;
    	loginModel.name = names[0];
    	loginModel.geonames = {};
		//loginModel.user = user;
		loginModel = JSON.stringify(loginModel);

		var http = require('http');
		//var url = 'http://jsonplaceholder.typicode.com';
		//var url = 'www.google.com';
		//var url = 'http:api.geonames.org/findNearbyJSON?lat=47.3&lng=9&username=demo';
		var url = 'api.geonames.org';

		var options = {
			host: url,
			port: 80,
			path: '/findNearbyJSON?lat=47.3&lng=9&username=demo',
			method: 'GET',
			headers: {
				//'Content-Type': 'application/json'
				//'Content-Type': 'application/x-www-form-urlencoded',
			}
		};

		var request = http.request(options, function(response) {
			  // response is here
				var geonames = '';
				console.log(options.host + ':' + response.statusCode);
				//response.setEncoding('utf8');
				console.log('starting data......... request.....');

				response.on('data', function(chunk) {
					console.log(chunk);
					geonames += chunk;
				});

				response.on('end', function() {
					console.log(geonames);
					JSON.stringify(loginModel);
					// TODO: SOLVE THE PROBLEM
					loginModel.geonames = JSON.stringify(geonames);
					JSON.stringify(loginModel);
					req.loginModel = loginModel;
					next();
				});
			});

			request.on('error', function(err) {
				//throw new Error(err + ' Ajax request failed');
				console.log('no data');
			});

			console.log('content printing....');
			//req.write(postData); // can be used query string data

		request.end();
	};
};