module.exports = function(app) {
	var loginModel = {};
	var user = require(app.get('modelsInclude') + 'user');
	var names = ['Login'];
	var page = {};
	page.title = 'Please Login';

	loginModel.page = page;
	loginModel.name = names[0];
	//loginModel.user = user;
	return JSON.stringify(loginModel);
};
