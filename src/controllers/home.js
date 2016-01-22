module.exports.controller = function(app) {
	app.get("/", function(req, res, next) {
		// doo all the logic with data
		var data = JSON.parse(require(app.get('models') + 'home.js')(app));
		res.render('home', {data: data});
	});
};