var siteDeferred = {

	init: function () {
		// preload done
		site.body.removeClass('preload');
		// other
		siteDeferred.setup.init();
	},

	setup: {

		init: function () {
			siteDeferred.setup.cms();
			siteDeferred.setup.smoothScroll();
			siteDeferred.setup.analytics();
		},

		cms: function () {
			$('.cms:not(.js-cms-done)').each(function () {
				var wrapper = $(this);

				// tables
				wrapper.find('table:not(.js-cms-table-done)').wrap('<div class="cms-table" />');

				// images
				wrapper.find('img:not(.js-cms-image-done)').removeAttr('style width height');

				// done
				wrapper.addClass('js-cms-done');
			});
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

		},

		analytics: function () {

			site.analytics = {

				init: function () {
					$('a[data-analytics-event]:not(.js-analytics-done)').each(function () {
						var link = $(this);
						var e = link.attr('data-analytics-event').split('|');
						// click
						link.on('click', function () {
							site.analytics.track(e[0], e[1], e[2]);
						});
						// done
						link.addClass('js-analytics-done');
					});
				},

				page: function (url, title) {
					dataLayer.push({
						'virtualPageUrl': url,
						'virtualPageTitle': title,
						'event': 'VirtualPageView'
					});
				},

				track: function (category, action, label) {
					dataLayer.push({
						'eventCategory': category,
						'eventAction': action,
						'eventLabel': label,
						'event': 'EventTracking'
					});
				}

			};

			site.analytics.init();

		}

	}

};

$(function () {
	siteDeferred.init();
	site.doc.ajaxComplete(function () {
		siteDeferred.init();
	});
});