module.exports.controller = function(app) {
	app.get("/fontIcons", function(req, res, next) {
		// doo all the logic with data
		var data = JSON.parse(require(app.get('models') + 'fontIcons')(app));
		res.render('fontIcons', {data: data});
	});
};