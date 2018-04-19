var takeoverLink = {

	init: function () {

		$('.js-takeover-link:not(.js-takeover-link-done)').each(function () {
			var link = $(this);
			var id = $('a' + link.attr('data-takeover-id'));

			if (!id.length) return false;

			// click
			link.off('click').on('click', function () {
				// click
				id.click();
				// scroll to
				if (link.attr('data-takeover-scroll')) {
					site.scrollTo($(link.attr('data-takeover-scroll')).offset().top);
				}				
				return false;
			});

			// done
			link.addClass('js-takeover-link-done');
		});

	}

};

$(function () {
	takeoverLink.init();
	site.doc.ajaxComplete(function () {
		takeoverLink.init();
	});
});