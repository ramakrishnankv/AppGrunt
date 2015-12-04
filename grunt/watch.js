module.exports = {
	options: {
		livereload: false
	},
	scripts: {
		files: ['src/**' ],
		tasks: ['less', 'jshint', 'copy', 'jade']
	}
}
