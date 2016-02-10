define('MyAgent', ['jquery'], function($) {
	var MyAgent = function(el, options) {
		this.element = el;
		this.attachEvents();
	};

	MyAgent.prototype = {
		attachEvents: function() {
			this.element.on('click', $.proxy(this.analyse, this));
		},
		analyse: function() {
			console.log('clicked on MyAgent');
		}
	} ;

	return MyAgent;
});