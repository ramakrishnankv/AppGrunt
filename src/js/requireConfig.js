var paths = {
		jquery: 'vendor/jQuery',
		domReady: 'vendor/requireDomReady',
		test: 'test',
		MyAgent: 'components/MyAgent'
};

requirejs.config({
	baseUrl: 'build/js',
	paths: paths
});

require(['jquery', 'domReady'], function ($, domReady) {
	domReady(function () {
		//This function is called once the DOM is ready.
		//It will be safe to query the DOM and manipulate
		//DOM nodes in this function.
		var agents = ['jquery'];
		$('*[data-agent]')
			.each(function(i, el) {
				var $el = $(el);
				var $agent = $el.data("agent");

				agents.push($agent);
				window[$agent] = $agent;
					//console.log('test ' + typeof window[$agent] + ' :: ' + typeof $agent);
				if($agent) {
					//console.log('attaching agent ' + $agent);
					var ag = $agent;
					//console.log(ag);
					//ag.init.call(window[$agent].prototype, $el);
				}

			});
		console.log(agents);
		// TODO: Attach the agent to the element
		//requirejs(['jquery', 'test'], function($, test) {});
		/*define(name, [], '[data-agent~='+name+']', function () {
			    console.log(arguments.length);
		});*/
  });
});


/*requirejs(['jquery', 'test'], function($, test) {
	console.log($.fn.jquery + ' loaded');
	var nn = new Samay();
	var nnName = nn.getName();
	console.log(nnName);
	$(function(){
		var $els = $("*")
			.each(function(i, el) {
				var $el = $(el);
				var $agent = $el.data("agent");
				if($agent) {
					console.log(typeof window[$agent]);
					console.log(require);
					if(typeof window[$agent] === 'function') {
						console.log('attaching agent ' + $agent);
						//var ag = new window.agentName;
						//ag.init.apply(window[agentName].prototype, $el);
				}
			}
		});
	});

});*/
