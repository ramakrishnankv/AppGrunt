module.exports = {
	build: {
		cwd: 'src',
		src: ['**/*.*', '!*.jade', '!layouts/*.jade', '!views/*.jade', '!templates/*.jade', '!styles/**' ],
		dest: 'build',
		expand: true
	}
}
