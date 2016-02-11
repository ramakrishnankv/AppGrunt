module.exports = {
	options: {
		livereload: true
	},
	scripts: {
		files: ['src/**', '*.js' ],
		tasks: ['less', 'jshint', 'copy', 'webfont', 'jade']
	}
}
