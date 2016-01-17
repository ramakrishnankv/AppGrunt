module.exports = function(app) {
    app.use(function(err, req, res, next) {
        console.error(err);
        var data = require(app.get('models') + 'error.js');
        res.redirect('/error');
    });
};