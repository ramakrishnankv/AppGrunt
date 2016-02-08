var paths = {
		jquery: '/build/js/vendor/jQuery',
		requireDomReady: '/build/js/vendor/requireDomReady',
		test: 'test',
		MyAgent: 'components/MyAgent'
};

requirejs.config({
	baseUrl: './build/js',
	paths: paths
});

require(['jquery', 'requireDomReady'], function ($, domReady) {
	var agents = [];
	var attachAgent = function(b){
			console.log(b);
		};
	domReady(function () {
		//This function is called once the DOM is ready.
		//It will be safe to query the DOM and manipulate
		//DOM nodes in this function.
		console.log($.fn.jquery);
		$('*[data-agent]')
			.each(function(i, el) {
				var $el = $(el);
				var $agent = $el.data("agent");
				agents.push($agent);
					console.log($agent);
				if($agent) {
					require([agents[i]], attachAgent);
				}

			});
	});
});