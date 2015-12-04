module.exports = {
	build: {
		cwd: 'src',
		src: ['**/*.*', '!*.jade', '!layout/*.jade', '!views/*.jade', '!template/*.jade', '!style/**' ],
		dest: 'build',
		expand: true
	}
}
