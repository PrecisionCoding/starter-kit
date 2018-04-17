var external = {

	init: function () {
		$('a.js-external:not(.js-external-done)').each(function () {
			var link = $(this);
			// click
			link.off('click').on('click', function () {
				if (Modernizr.touch || site.win.width() < 640) return true;
				var w = typeof link.attr('data-width') !== 'undefined' ? parseInt(link.attr('data-width'), 10) : 640;
				var h = typeof link.attr('data-height') !== 'undefined' ? parseInt(link.attr('data-height'), 10) : 480;
				var l = Math.round((site.win.width() - w) / 2);
				var t = Math.round((site.win.height() - h) / 2);
				window.open(link.attr('href'), 'Popup', 'width=' + w + ',height=' + h + ',left=' + l + ',top=' + t + ',toolbar=no,scrollbar=yes');
				return false;
			});
			// done
			link.addClass('js-external-done');
		});
	}

};

$(function () {
	external.init();
	site.doc.ajaxComplete(function () {
		external.init();
	});
});