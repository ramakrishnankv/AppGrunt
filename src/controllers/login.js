// TODO: move this to a separate file & function
var renderView = function(req, res) {
	console.log('to request');
	console.log(JSON.parse(req.loginModel));
	res.render('login', {data: JSON.parse(req.loginModel)});
};
module.exports.controller = function(app) {
	var getData = require(app.get('models') + 'login.js')(app);
	app.get('/login', getData, renderView);
};