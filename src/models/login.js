module.exports = function(app) {
	//TODO: Middleware requestHandler not working - to be fixed.
	var urls = ['http://jsonplaceholder.typicode.com/posts/1',
				'http://api.geonames.org/findNearbyJSON?lat=47.3&lng=9&username=demo'];
	var requestHandler = require(app.get('helpers') + 'requestHandler');
	function callback(dt) {
		console.log(dt);
	}
	app.use(requestHandler(urls, callback));

	return function(req, res, next) {
		var loginModel = {};
		var user = require(app.get('modelsInclude') + 'user');
		var names = ['Login'];
		var page = {};
		page.title = 'Please Login';
		loginModel.page = page;
		loginModel.name = names[0];
		loginModel.geonames = {};
		loginModel.user = user;
		loginModel = JSON.stringify(loginModel);

		//TODO: Make this common requester
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
			response.setEncoding('utf8');

			response.on('data', function(chunk) {
				geonames += chunk;
				geonames = JSON.parse(geonames);
			});

			response.on('end', function() {
				// parse before concatenate the received object
				loginModel = JSON.parse(loginModel);
				loginModel.geonames = geonames;
				req.appPageData = JSON.stringify(loginModel);
				req.appPageView = 'login';
				next();
			});
		});

		request.on('error', function(err) {
			// error - Request failed, check the url http/https is not required');
			next(err);
		});

		request.end();
	};
};