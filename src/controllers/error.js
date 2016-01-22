module.exports.controller = function(app) {
	app.get("/error", function(req, res, next) {
		// doo all the logic with data
		var data = JSON.parse(require(app.get('models') + 'error.js')(app));
		res.render('error', {data: data});
	});
};