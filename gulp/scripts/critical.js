var site = {

	win: null,
	doc: null,
	body: null,

	bp: {
		mobileLarge: 500,
		tablet: 620,
		tabletLarge: 788,
		desktop: 980,
		desktopLarge: 1100,
		large: 1290
	},

	preInit: function () {
		site.win = $(window);
		site.doc = $(document);
		site.body = $('body');
		alert('critical');
	}

};