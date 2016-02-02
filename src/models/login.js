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

	var urls = ['http://jsonplaceholder.typicode.com/posts/1',
				'http://api.geonames.org/findNearbyJSON?lat=47.3&lng=9&username=demo'];

	var callback = function (responseData) {
		var resData = responseData;
		var obj = ['typicode', 'geonames'];

		resData.forEach(function(a, index) {
			loginModel[obj[index]] = a;
		});

		req.appPageData = JSON.stringify(loginModel);
		req.appPageView = 'login';
		next();
	};

	var requestHandler = require(app.get('helpers') + 'requestHandler')(urls, callback);
	requestHandler();
};