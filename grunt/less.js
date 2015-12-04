module.exports = {
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
}
