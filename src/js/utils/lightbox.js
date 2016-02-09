define("lightbox",
	["jquery"],
	function($) {

		var d = document,
			w = window,
			$lightbox, // reference to lightbox mask element, when lightbox is open
			$lightboxContent, // reference to lightbox content element, when lightbox is open
			modal, // state boolean - false = normal lightbox, true = modal lightbox
			update, // state boolean - false = new lightbox, true = content update
			$d = $(d),
			$de = $(d.documentElement);
			
		var DEFAULTS = {
			className : ""
		};

		// create handleScrolling function, as needed based on browser capabilities
		var handleScrolling = (function() {
			
			var vendors = ["Moz", "ms", "o", "webkit"]; // no official w3c property yet, so only prefixes
			var jsScrolling = false;
			
			if ("ontouchstart" in d) {
				jsScrolling = true;
				for (var vendor in vendors) {
					if (vendors[vendor]+"OverflowScrolling" in d.documentElement.style) {
						jsScrolling = false;
						break;
					}
				}
			}
			
			// jsScrolling is used on iOS < 5, Android < 4, ?
			if (jsScrolling) {
			
				return function() {
					var initialPosition;
					$lightbox.on("touchstart", function(e) {
						var oe = e.originalEvent;
						initialPosition = $lightbox[0].scrollTop + oe.touches[0].pageY;
					});
					$lightbox.on("touchmove", function(e) {
						var oe = e.originalEvent;
						$lightbox[0].scrollTop = initialPosition - oe.touches[0].pageY;
						e.preventDefault();
					});
				};
			
			} else {
				return function(){};
			}
		})();

		// open - sets up lightbox and triggers content retrieval or opening, as appropriate
		var open = function(content, options) {
			
			var opts = $.extend({}, DEFAULTS, options),
				parameters,
				string,
				url,
				className = opts.className;

	
			// set update status based on whether lightbox currently exists
			update = !!$lightbox;

			if (!!(content && content.nodeType == 1)) { // is an element

				// if element, we've passed the submit button for the form we want to submit
				url = content.form.action;
				parameters = $(content.form).serialize({
					submit: content.name
				});

			} else if (Object.prototype.toString.call(content) === '[object String]') {

				url = content;

			} else {

				string = content.content;
				url = content.url;

			}

			if (!update) {

				$lightbox = $([
						"<div id=\"lightbox\" class=\"",
						(modal ? "modal" : ""),
						"\" role=\"",
						(modal ? "alertDialog" : "dialog"),
						"\" tabindex=\"-1\"></div>"
					].join(""));
				
				$lightbox.css({"opacity":"0"});
				$(d.body).append($lightbox);
				$lightbox.data("focus", d.activeElement);
				
				var scrollPosition = [
					w.pageXOffset || document.documentElement.scrollLeft,
					w.pageYOffset || document.documentElement.scrollTop
				];
				
				$de.addClass("lb-active");
				
				w.scrollTo(scrollPosition[0], scrollPosition[1]);
				
				$lightbox.data("scrollPosition", scrollPosition);
				
				handleScrolling();
				resize();
				
				$lightbox.css({"opacity":"1"});
			}
	
			// ensure users can exit the lightbox
			if (!modal) {

				w.setTimeout(function() {

					if ($lightbox) {
						$lightbox.on("click", function(e) {
							if (this != e.target) {
								return;
							}
							$d.trigger("lightbox:close");
						});
					}
				}, 1000); // 1s delay to prevent dblclick closing

				$d.on("keyup", function handler(e) {
					if (e.keyCode != 27) { // esc key
						return;
					}
					$d.off("keyup", handler).trigger("lightbox:close");
				});
			}

			$d.on("modal:close", close);

			$d.on("lightbox:close", close);
			
			// get content and open lightbox
			if (url) {
				getContent(url, parameters);
			} else {
				openWithContent(string);
			}

		};
	
		// grabs content (with optional parameters) and triggers openWithContent
		var getContent = function(url, parameters) {

			var pi, timeout;

			$.ajax({
				url: url,
				data: parameters,
				success: function(r) {
					w.clearTimeout(timeout);
					if (pi) {
						pi = null;
					}
					openWithContent(r);
				}
			});
		
			if (!update) {

				timeout = setTimeout(function() {
					//pi = new ProgressIndicator($lightbox);
				}, 1000); // waiting indicator becomes useful after waiting 1s

			}

		};
	
		// opens lightbox content and initializes
		var openWithContent = function(content) {

			$lightboxContent = $([
						"<div id=\"lightbox-content\">",
						content,
						"</div>"
					].join(""));

			if (!update) {

				$lightboxContent.css({"opacity":"0"});

			}

			if (modal) {

				$lightbox.html($("<div id=\"lightbox-center\"></div>").html($lightboxContent));

			} else {

				$lightbox.html($lightboxContent);

			}

			// after content is initialized, set focus, display, and event listeners
			$lightbox.focus();

			if (!update) {

				$lightboxContent.css({"opacity":"1"});

			}
			
			fireTracking($lightboxContent);

		};
	
		// closes lightbox, performs cleanup
		var close = function() {

			if (!$lightbox) { // if not open, can't close
				return;
			}

			var oldFocus = $lightbox.data("focus");
			var scrollPosition = $lightbox.data("scrollPosition");

			$lightbox.remove();

			$de.removeClass("lb-active");

			w.scrollTo(scrollPosition[0], scrollPosition[1]);
			oldFocus.focus();
			$d.off("lightbox:close", close);
			$d.off("modal:close", close);
			modal = update = $lightbox = $lightboxContent = null;
			
		};
	
		// updates to reflect changes in window size
		var resize = function() {
			if (!$lightbox) {
				return;
			}
			$lightbox.css({
				"height": (w.innerHeight || d.documentElement.offsetHeight)+"px",
				"width": (w.innerWidth || d.documentElement.offsetWidth)+"px"
			});
		};
		
		// parse element attributes into options
		var parseOptions = function (el) {
			return {
				href: el.readAttribute("data-href") || el.href,
				className: el.readAttribute("data-lightbox-class") || ""
			};
		};
	
		// creates input event handler
		var handleInput = function (isModal) {
			return function (e, el) {
				modal = isModal;
				open(el, parseOptions(el));
				e.preventDefault();
			};
		};
	
		// creates link event handler
		var handleLink = function (isModal) {
			return function(e, el) {
				modal = isModal;

				el = e.target();
				var options = parseOptions(el);
				open(options.href, options);
				e.preventDefault();
			};
		};
	
		// fire webtrends tag for any errors on the lightbox
		var fireTracking = function ($el) {
			
			var errors = $el.find('p[data-context^="message-"]'), //find all errors on the lightbox content
				codes = [];
			
			errors.each(function(error) { 
				codes.push(error.readAttribute('data-context').split('-')[1]); //eg data-context="message-1234" gives 1234
			});
			
			if (codes.length > 0) {
				$d.trigger("webtrends:multiTrackEvent", {
					"DCSext.er": codes.join(";") //multiple errors are semicolon separated in webtrends
				});
			}
			
		};

		// listeners
		$d.on("lightbox:open", function(e, memo) {
			modal = false;
			open(memo);
		});
		$d.on("modal:open", function(e, memo) {
			modal = true;
			open(memo);
		});
		$d.on("click", "input[type=submit][data-rel~=lightbox]", handleInput(false));
		$d.on("click", "input[type=submit][data-rel~=modal]", handleInput(true));
		$d.on("click", "a[rel~=lightbox]", handleLink(false));
		$d.on("click", "a[rel~=modal]", handleLink(true));
		$d.on("click", "a[rel~=close]", function(e) {
			close();
			e.preventDefault();
		});
		$(w).on("resize", resize);
	
	});