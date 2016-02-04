module.exports.controller = function(app) {
	app.get("/layoutExamples", function(req, res, next) {
		// doo all the logic with data
		var data = JSON.parse(require(app.get('models') + 'layoutExamples')(app));
		res.render('layoutExamples', {data: data});
	});
};