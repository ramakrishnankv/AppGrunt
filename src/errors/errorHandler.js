module.exports = function(app) {
    app.use(function(err, req, res, next) {
        console.error(err);
	    if (req.xhr) {
	        res.send(500, {error: 'Oops'});
	    } else {
	        next(err);
	    }
        res.redirect('/error');
    });
};