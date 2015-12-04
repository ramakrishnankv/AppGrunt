module.exports = {
	compile: {
		options: {
			data: '<%= pkg.name %>'
			/*data: function(dest, src) {
				// Return an object of data to pass to templates
				return require('./userData.json');
			}*/
		},
		files: [{
			expand: true,
			cwd: 'src',
			src: [ '*.jade', '!layout/*.jade', '!template/*.jade' ],
			dest: 'build',
			ext: '.html'
		}]
	}
}
