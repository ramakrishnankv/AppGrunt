module.exports = {
	icons: {
		src: 'src/styles/fontIcons/svg/*.svg',
		dest: 'build/styles/fontIcons',
		destCss: 'src/styles/fontIcons',
		options: {
			font: 'icons',
			stylesheet: 'less',
			fontFilename: 'icons-{hash}',
			hashes: true,
			styles: 'font, icon',
			order: 'eot,woff,ttf,svg',
			syntax: 'bem',
			relativeFontPath: 'fontIcons/',
			engine: 'node',
			templateOptions: {
				baseClass: 'icon',
				classPrefix: 'ficon-',
				mixinPrefix: 'ficon-'
			}
		}
	}
}
