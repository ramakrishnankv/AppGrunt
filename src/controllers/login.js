module.exports.controller = function(app) {
    var data = JSON.parse(require(app.get('models') + 'login.js')(app));
    app.get("/login", function(req, res, next) {
        // doo all the logic with data
        res.render('login', {data: data, title: 'Test'});
    });
};
