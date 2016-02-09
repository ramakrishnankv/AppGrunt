define('TestAgent', ['jquery'], function($) {
	var TestAgent = function(el, options) {
		this.element = el;
		this.attachEvents();
	};

	TestAgent.prototype = {
		attachEvents: function() {
			console.log(this.element);
			this.element.on('click', $.proxy(this.analyse, this));
		},
		analyse: function() {
			console.log('TestAgent clicked on');
		}
	} ;

	return TestAgent;
});