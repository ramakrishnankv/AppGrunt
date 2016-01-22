module.exports = function(app) {
	var errorModel = {};
	var user = require(app.get('modelsInclude') + 'user');
	var names = ['Error'];
	var page = {};
	page.title = 'Error Page';

	errorModel.page = page;
	errorModel.name = names[0];
	errorModel.user = user;
	errorModel.comingSoon = "Sorry! the page you are searching is not available or moved!";
	errorModel.escapeMsg = "Escape markup - ! @ # $ % ^ & * ( ) < > / \ ~ --> use !{content} instead of !{content}";
	return JSON.stringify(errorModel);
};
