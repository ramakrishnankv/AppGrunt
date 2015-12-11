module.exports.controller = function(app) {
    var data = require(app.get('models') + 'login.js');
    app.get("/login", function(req, res, next) {
        // doo all the logic with data
        res.render('login', {data: data, title: 'Test'});
    });
};