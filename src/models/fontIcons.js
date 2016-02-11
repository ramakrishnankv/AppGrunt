module.exports = function(app) {
	var fontIconsModel = {};
	var user = require(app.get('modelsInclude') + 'user');
	var names = ['Font Icons'];
	var page = {};
	page.title = 'Font Icons';

	fontIconsModel.page = page;
	fontIconsModel.name = names[0];
	fontIconsModel.user = user;
	return JSON.stringify(fontIconsModel);
};
