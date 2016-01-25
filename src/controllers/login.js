module.exports.controller = function(app) {
	var getData = require(app.get('models') + 'login')(app);
	var renderView = require(app.get('helpers') + 'renderView');
	app.get('/login', getData, renderView);
};