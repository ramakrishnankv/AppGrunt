module.exports = function(app) {
	var homeModel = {};
	var user = require(app.get('modelsInclude') + 'user');
	var names = ['Home'];
	var page = {};
	page.title = 'Home page';

	homeModel.page = page;
	homeModel.name = names[0];
	homeModel.user = user;
	return JSON.stringify(homeModel);
};
