var gallery = {

	init: function () {
		$('.m-gallery__menu:not(.js-gallery-done)').each(function () {
			var wrapper = $(this);

			// init
			wrapper.bxSlider({
				infiniteLoop: false,
				hideControlOnEnd: true,
				speed: 1000
			});

			// done
			wrapper.addClass('js-gallery-done');
		});
	}

};

$(function () {
	gallery.init();
	site.doc.ajaxComplete(function () {
		gallery.init();
	});
});