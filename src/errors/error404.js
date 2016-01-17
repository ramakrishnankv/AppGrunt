module.exports = function(app) {
    app.use(function(req, res, next) {
        throw new Error(req.url + ' Requested page not found');
    });
};