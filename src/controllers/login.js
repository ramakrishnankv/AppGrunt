module.exports.controller = function(app) {
	app.get("/login", function(req, res, next) {
		// doo all the logic with data
		var data = JSON.parse(require(app.get('models') + 'login.js')(app));
		res.render('login', {data: data});
	});
};
