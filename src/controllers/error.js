module.exports.controller = function(app) {
    var data = require(app.get('models') + 'error.js');
    app.get("/error", function(req, res, next) {
        // doo all the logic with data
        res.render('error', {data: data, title: 'Test'});
    });
};