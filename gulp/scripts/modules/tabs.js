var tabs = {

	init: function () {

		$('.js-tabs:not(.js-tabs-done)').each(function () {
			var wrapper = $(this);
			var tabsLinks = wrapper.find('.js-tabs-link');
			var tabsContent = wrapper.find('.js-tabs-tab');

			// change
			var changeTab = function (id, scroll) {
				var newTab = wrapper.find(id);
				// update links
				tabsLinks.removeClass('active').filter('[href="' + id + '"]').addClass('active');
				// update content
				tabsContent.hide().filter(id).show();
				// scroll
				if (scroll) {
					site.scrollTo(newTab.offset().top);
				}
			};

			// init
			if (tabsLinks.filter('.active').length == 1) {
				changeTab(tabsLinks.filter('.active').attr('href'), false);
			}
			else {
				changeTab(tabsLinks.first().attr('href'), false);
			}

			// links
			tabsLinks.off('click').on('click', function () {
				var link = $(this);
				if (link.is('.active')) return false;
				changeTab(link.attr('href'), false);
				return false;
			});

			// done
			wrapper.addClass('js-tabs-done');
		});

	}

};

$(function () {
	tabs.init();
	site.doc.ajaxComplete(function () {
		tabs.init();
	});
});