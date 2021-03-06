module.exports = function(grunt) {
	var options = {
		data: {
			pkg: grunt.file.readJSON('package.json')
		}
	};

	require('load-grunt-config')(grunt, options);

	grunt.registerTask(
			'build',
			'Compiles all of the assets and copies the files to the build directory and runs lesshat',
			['clean', 'copy', 'webfont', 'less', 'jade', 'jshint', 'uglify']
	);
	// Default task(s).
	grunt.registerTask('default', ['build', 'startapp', 'watch']);
	grunt.registerTask('startapp', function(){
		require('./index.js');
	});

}
