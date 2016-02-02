module.exports.controller = function(app) {
	var loginData = require(app.get('models') + 'login');
	var renderView = require(app.get('helpers') + 'renderView');
	app.get('/login', loginData, renderView);
};