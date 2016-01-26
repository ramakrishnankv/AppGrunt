module.exports = function(req, res) {
	//console.log(req.appPageData);
	//console.log(req.appPageView);
	res.render(req.appPageView, {data: JSON.parse(req.appPageData)});
};