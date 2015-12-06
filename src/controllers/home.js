module.exports.controller = function(app) {
    var data = require(app.get('models') + 'home.json');
    app.get("/", function(req, res, next) {
        // doo all the logic with data
        res.render('home', {data: data, title: 'Test'});
    });
};