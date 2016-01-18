module.exports = function(app) {
	var loginModel = {};
	var names = ['Login'];
	var page = {};
	page.title = 'Please Login';
	loginModel.page = page;
	loginModel.name = names[0];

	return JSON.stringify(loginModel);
};
