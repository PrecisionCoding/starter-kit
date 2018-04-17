var siteDeferred = {

	init: function () {
		// preload done
		site.body.removeClass('preload');
		// other
		siteDeferred.setup.init();
	},

	setup: {

		init: function () {
			siteDeferred.setup.smoothScroll();
		},

		smoothScroll: function () {

			site.scrollTo = function (offset, speed) {
				var value = parseInt(offset, 10);
				if (value < 0 && $('html, body').scrollTop !== value) return;
				$('html, body').animate({ scrollTop: value }, speed || 500);
			};

			site.smoothScroll = function () {
				$('a[href*="#"]:not(.js-scroll-done)').each(function () {
					var link = $(this);
					link.on('click', function () {
						if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
							var target = $(this.hash);
							target = target.length && target || $('[name=' + this.hash.slice(1) + ']');
							if (target.length) {
								var targetOffset = target.offset().top;
								if (site.win.scrollTop != targetOffset) {
									site.scrollTo(targetOffset);
								}
								return false;
							}
						}
					});
					link.addClass('js-scroll-done');
				});
			};

			site.smoothScroll();

		}

	}

};

$(function () {
	siteDeferred.init();
	site.doc.ajaxComplete(function () {
		siteDeferred.init();
	});
});