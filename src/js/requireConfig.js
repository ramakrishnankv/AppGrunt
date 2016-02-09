var paths = {
		jquery: '/build/js/vendor/jQuery',
		requireDomReady: '/build/js/vendor/requireDomReady',
		TestAgent: '/build/js/TestAgent',
		MyAgent: '/build/js/components/MyAgent',
		lightbox: '/build/js/utils/lightbox'
};

requirejs.config({
	baseUrl: './build/js',
	paths: paths
});

require(['jquery', 'requireDomReady', 'lightbox'], function ($, domReady, lightbox) {
	domReady(function () {
		//This function is called once the DOM is ready.
		//It will be safe to query the DOM and manipulate
		//DOM nodes in this function.

		/*
		* Find elements that has attribute data-agent and attach agents to the element
		* data-agent = '<agent variable name>'
		* Other data-* attributes are options / data passed to the constructor function as second parameter
		* First parameter would be jQuery(element) that data-agent is attached
		* Markup:
		* <div data-agent="MyAgent" data-option1="option1" data-option2="option2">
		* MyAgent.js
		* define('MyAgent', ['jquery'], function($) {
		* 	var MyAgent = function(el, options) {
		*
		* 	};
		*   MyAgent.prototype = { define prototype here }
		*
		*  return MyAgent;
		*
		* });
		*
		* */
		$('*[data-agent]')
			.each(function(i, el) {
				var $el = $(el);
				var dataAgent = $el.data("agent");

				if(dataAgent) {
					require([dataAgent], function(agent){
						var options = $el.data();
						delete options.agent; // remove data-agent and send other options data-*
						if(agent && agent.prototype.constructor === Object) {
							return new agent($el, options);
						}
						else {
							new Error(agent + ' is undefined');
						}
					});
				}

			});
	});
},
function(err) {
	// Might not be used at all. Express would trow 404 Page not found error
});