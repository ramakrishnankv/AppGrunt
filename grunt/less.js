module.exports = {
	development: {
		options: {
			paths: ["build/styles"],
			ieCompat: true
		},
		files: {
			"build/styles/base.css": "src/styles/base.less"
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
}
