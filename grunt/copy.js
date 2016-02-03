module.exports = {
	build: {
		cwd: 'src',
		src: ['**/*.*', '!*.jade', '!layouts/*.jade', '!views/*.jade', '!templates/*.jade', '!styles/**/*.less' ],
		dest: 'build',
		expand: true
	}
}
