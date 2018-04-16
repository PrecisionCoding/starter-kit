var siteDeferred = {

	init: function () {

	}

};

$(function () {
	siteDeferred.init();
	site.doc.ajaxComplete(function () {
		siteDeferred.init();
	});
});