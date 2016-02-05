define('MyAgent', ['jquery'], function($) {
	console.log(this);
	var MyAgent = function() {};

	MyAgent.prototype = {
		init: function() {
			this.name = 'agent is running';
			console.log('init called');
		}
	} ;

	return MyAgent;
});