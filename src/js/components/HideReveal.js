/*
 * Component: HideReveal
 * Parameters: none
 * Inserts a link with + Show or - Hide text after the hidden content, clicking on which the content will toggle display
 * Markup:
 * <div class="plain-container" data-agent="HideReveal">
 *     <div class="hiddenContent plain-container hidden">Contents</div>
 * </div>
 * TODO: Configure initial status of the content to open or closed
 *
 */
define('HideReveal', ['jquery'], function($) {
	var HideReveal = function(el, options) {
		this.element = el;
		this.showText = options.showtext;
		this.hideText = options.hidetext;
		this.createLink();
	};

	HideReveal.prototype = {
		hideContent: function(el) {
			el.hide('fast');
		},
		showContent: function(el) {
			el.show('fast');
		},
		createLink: function() {
			var link = $('<a href="#">' + this.showText + '</a>'),
				$el = $(this.element),
				$cont = this.$cont = $('.hiddenContent', $el);

			$el.append(link);
			$cont.hide();
			$cont.removeClass('hidden');
			link.on('click', $.proxy(this.showHide, this));
		},
		showHide: function(e) {
			var link = $(e.target);

			if(this.$cont.is(":visible")) {
				this.hideContent(this.$cont);
				link.text(this.showText);
			}
			else {
				this.showContent(this.$cont);
				link.text(this.hideText);
			}
		}
	} ;

	return HideReveal;
});