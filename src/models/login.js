module.exports = function (req, res, next) {

	var app = req.app;

	var loginModel = {};
			var user = require(app.get('modelsInclude') + 'user');
			var names = ['Login'];
			var page = {};
			page.title = 'Please Login';
			loginModel.page = page;
			loginModel.name = names[0];
			loginModel.user = user;
			loginModel = JSON.stringify(loginModel);
			req.appPageData = loginModel;

	var urls = ['http://jsonplaceholder.typicode.com/posts/1',
				'http://api.geonames.org/findNearbyJSON?lat=47.3&lng=9&username=demo'];


	console.log('till ehre...............');



	var callback = function (responseData) {
		console.log('hhhhhhhhhhhhhhhhhhhhhhhh');
		console.log(responseData);
		var resData = JSON.parse(responseData);
		var obj = ['typicode', 'geonames'];
		console.log(typeof resData);
		console.log(resData);
		//req.appPageData.typicode=JSON.parse(responseData);
		//req.appPageData.geonames=responseData[1];
		resData.forEach(function(a, index) {
			var prop = obj[index];
			console.log(prop);
			req.appPageData['"' + prop + '"'] = a;
		});
		console.log(req.appPageData);
		req.appPageView = 'login';
		next();
	};
		var requestHandler = require(app.get('helpers') + 'requestHandler')(urls, callback);
		//app.use(requestHandler);
		requestHandler();


	/*return function (req, res, next) {


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
	};*/
};