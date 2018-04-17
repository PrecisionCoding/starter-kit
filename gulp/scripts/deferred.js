var siteDeferred = {

	preInit: function () {
		// preload done
		site.body.removeClass('preload');
	},

	init: function () {
		siteDeferred.setup.init();
	},

	setup: {

		init: function () {
			siteDeferred.setup.scrollTo();
			siteDeferred.setup.smoothScroll();
		},

		scrollTo: function () {
			site.scrollTo = function (offset, speed) {
				var value = parseInt(offset, 10);
				if (value < 0 && $('html, body').scrollTop !== value) return;
				$('html, body').animate({ scrollTop: value }, speed || 500);
			};
		},

		smoothScroll: function () {

		}

	}

};

$(function () {
	siteDeferred.preInit();
	site.doc.ajaxComplete(function () {
		siteDeferred.init();
	});
});