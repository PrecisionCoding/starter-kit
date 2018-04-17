var siteDeferred = {

	preInit: function () {
		// preload done
		site.body.removeClass('preload');
	},

	init: function () {

	}

};

$(function () {
	siteDeferred.preInit();
	site.doc.ajaxComplete(function () {
		siteDeferred.init();
	});
});