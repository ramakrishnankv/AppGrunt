module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			build: {
				src: ['build']
			}
		},
		copy: {
			build: {
				cwd: 'src',
				src: [ '**', '!style/**', '!**/*.jade' ],
				dest: 'build',
				expand: true
			}
		},
		jshint: {
			options: {
				globals: {
					jQuery: true
				}
			},
			src: ['src/**/*.js']
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/<%= pkg.name %>.js',
				dest: 'build/<%= pkg.name %>.min.js'
			}
		},
		watch: {
			scripts: {
				files: ['**/*.*' ],
				tasks: ['jshint', 'copy', 'less', 'jade', 'connect']
			}
		},
		less: {
			development: {
				options: {
					paths: ["src/style"],
					ieCompat: true
				},
				files: {
					"build/style/base.css": "src/style/base.less"
				}
			}/*,
			production: {
				options: {
					paths: ["assets/css"],
					plugins: [
						new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
						new (require('less-plugin-clean-css'))(cleanCssOptions)
					],
					modifyVars: {
						imgPath: '"http://mycdn.com/path/to/images"',
						bgColor: 'red'
					}
				},
				files: {
					"path/to/result.css": "path/to/source.less"
				}
			}*/
		},
		jade: {
			compile: {
				options: {
					data: {}
				},
				files: [{
					expand: true,
					cwd: 'src',
					src: [ '**/*.jade' ],
					dest: 'build',
					ext: '.html'
				}]
			}
		},
		connect: {
			server: {
				options: {
					port: 6989,
					hostname: "*",
					base: "build",
					livereload: true
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask(
			'build',
			'Compiles all of the assets and copies the files to the build directory and runs lesshat',
			['clean', 'copy', 'less', 'jade', 'jshint', 'uglify']
	);
	// Default task(s).
	grunt.registerTask('default', ['build', 'connect', 'watch']);


}
