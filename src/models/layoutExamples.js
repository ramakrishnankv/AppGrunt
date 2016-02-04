module.exports = function(app) {
	var layoutExamplesModel = {};
	var user = require(app.get('modelsInclude') + 'user');
	var names = ['Layout Examples'];
	var page = {};
	page.title = 'Layout Examples page';

	layoutExamplesModel.page = page;
	layoutExamplesModel.name = names[0];
	layoutExamplesModel.user = user;
	return JSON.stringify(layoutExamplesModel);
};
