module.exports = function(app) {
	var loginModel = {};
	var user = require(app.get('modelsInclude') + 'user');
	var names = ['Login'];
	var page = {};
	page.title = 'Please Login';

	loginModel.page = page;
	loginModel.name = names[0];
	//loginModel.user = user;

	var http = require('http');
	var url = 'http://jsonplaceholder.typicode.com';

	var options = {
	    host: url,
	    port: 443,
	    path: '/posts/1',
	    method: 'GET',
	    headers: {
	        'Content-Type': 'application/json'
	    }
	};

	var req = http.request(options, function(res) {
	  // response is here
		var output = '';
		console.log(options.host + ':' + res.statusCode);
		res.setEncoding('utf8');
		console.log(res);

		res.on('data', function(chunk) {
			output += chunk;
		});

		res.on('end', function() {
			var obj = JSON.parse(output);
			//onResult(res.statusCode, obj);
			console.log("ended................");
			//return JSON.stringify(loginModel);
		});
	});

	req.on('error', function(err) {
		//res.send('error: ' + err.message);
		console.log(err);
	});

	req.end();
};
