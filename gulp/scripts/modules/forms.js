var forms = {

	init: function () {
		forms.loaderSubmit();
		forms.autosubmit();
		forms.maxLength();
		forms.showIf.init();
		forms.notices.init();
		forms.jqueryUi.init();
	},

	loaderSubmit: function () {
		$('form.js-loader-submit:not(.js-loader-submit-done)').each(function () {
			var form = $(this);

			// submit
			form.on('submit', function () {
				// check valid
				if (form.valid()) {
					// show loader
					popups.loader();
					// submit
					return true;
				}
				return false;
			});

			// done
			form.addClass('js-loader-submit-done');
		});
	},

	autosubmit: function () {

		$('.js-autosubmit:not(.js-autosubmit-done)').each(function () {
			var input = $(this);
			var form = input.closest('form');

			// change
			if (input.is('select')) {
				input.on('change', function () {
					form.submit();
				});
			}
			else {
				input.on('blur', function () {
					form.submit();
				});
			}

			// done
			input.addClass('js-autosubmit-done');
		});
	},

	maxLength: function () {
		$('input[data-maxlength]:not(.js-max-done), textarea[data-maxlength]:not(.js-max-done)').each(function () {
			var input = $(this);
			var count = input.parent().find('.js-maxlength-count');
			var limit = parseInt(input.attr('data-maxlength'), 10);

			// limit on keyup, click, paste or blur
			input.on('keyup click paste blur', function () {
				var remaining = limit - input.val().length;
				if (remaining <= 0) {
					input.val(input.val().substr(0, limit));
					remaining = 0;
				}
				if (remaining <= 10 && limit >= 20) {
					count.parent().addClass('text-error');
				}
				else {
					count.parent().removeClass('text-error');
				}
				if (remaining > 10 && remaining <= 20 && limit >= 30) {
					count.parent().addClass('text-warning');
				}
				else {
					count.parent().removeClass('text-warning');
				}
				count.text(remaining);
			}).blur();

			// done
			input.addClass('js-max-done');
		});
	},

	showIf: {

		init: function () {
			forms.showIf.checks();
			forms.showIf.radios();
			forms.showIf.dropdowns();
		},

		disableFormElements: function (parent) {
			parent.find("input,select").attr('disabled', 'disabled');
		},

		enableFormElements: function (parent) {
			parent.find("input,select").removeAttr('disabled');
		},

		checks: function () {
			$('.form-checks input[data-show-if]:checkbox:not(.js-show-if-done)').each(function () {
				var input = $(this);
				var reverse = input.attr('data-reverse') === 'true' ? true : false;
				var ref = input.attr('data-show-if').split(',');

				var check = function () {
					if (!input.is(':checked') && reverse) {
						// show
						for (var i = 0; i < ref.length; i++) {
							$(ref[i]).show();
							forms.showIf.enableFormElements($(ref[i]));
						}
					}
					else if (input.is(':checked') && reverse) {
						// hide
						for (var i = 0; i < ref.length; i++) {
							$(ref[i]).hide();
							forms.showIf.disableFormElements($(ref[i]));
						}
					}
					else if (input.is(':checked')) {
						// show
						for (var i = 0; i < ref.length; i++) {
							$(ref[i]).show();
							forms.showIf.enableFormElements($(ref[i]));
						}
					}
					else {
						// hide
						for (var i = 0; i < ref.length; i++) {
							$(ref[i]).hide();
							forms.showIf.disableFormElements($(ref[i]));
						}
					}
				};

				// change functionality
				input.on('change', function () {
					check();
				});

				// on load
				check();

				// done
				input.addClass('js-show-if-done');
			});
		},

		radios: function () {
			$('.form-checks:not(.js-show-if-done) input[data-show-if]:radio').closest('.form-checks').each(function () {
				var wrapper = $(this);

				// change functionality
				wrapper.find('input').each(function () {
					var input = $(this);
					var group = input.attr('name');

					var check = function (opt, show) {
						var ref = opt.attr('data-show-if').split(',');
						if (show) {
							for (var i = 0; i < ref.length; i++) {
								$(ref[i]).show();
								forms.showIf.enableFormElements($(ref[i]));
							}
						}
						else {
							for (var i = 0; i < ref.length; i++) {
								$(ref[i]).hide();
								forms.showIf.disableFormElements($(ref[i]));
							}
						}
					};

					// on change
					input.on('change', function () {
						// hide non-selected
						$('input[name="' + group + '"][data-show-if]:not(:checked)').each(function () {
							var opt = $(this);
							// hide
							check(opt, false);
						});
						// show selected
						$('input[name="' + group + '"][data-show-if]:checked').each(function () {
							var opt = $(this);
							// show
							check(opt, true);
						});
					});

					// on load
					if (input.is('[data-show-if]:not(:checked)')) {
						var opt = $(this);
						// hide
						check(opt, false);
					}
					if (input.is('[data-show-if]:checked')) {
						var opt = $(this);
						// show
						check(opt, true);
					}

				});

				// done
				wrapper.addClass('js-show-if-done');
			});
		},

		dropdowns: function () {
			$('select:not(.js-show-if-done) option[data-show-if]').closest('select').each(function () {
				var select = $(this);

				var check = function (opt, show) {
					var ref = opt.attr('data-show-if').split(',');
					if (show) {
						for (var i = 0; i < ref.length; i++) {
							$(ref[i]).show();
							forms.showIf.enableFormElements($(ref[i]));
						}
					}
					else {
						for (var i = 0; i < ref.length; i++) {
							$(ref[i]).hide();
							forms.showIf.disableFormElements($(ref[i]));
						}
					}
				}

				// change functionality
				select.on('change', function () {
					// hide non-selected
					select.find('option[data-show-if]').each(function () {
						var opt = $(this);
						if (opt.is(':selected')) {
							check(opt, true);
						}
						else {
							check(opt, false);
						}
					});
				});

				// on load
				select.find('option[data-show-if]').each(function () {
					var opt = $(this);
					if (opt.is(':selected')) {
						check(opt, true);
					}
					else {
						check(opt, false);
					}
				});

				// done
				select.addClass('js-show-if-done');
			});
		}

	},

	notices: {

		init: function () {
			forms.notices.timeout();
			forms.notices.close();
		},

		timeout: function () {
			$('.form-notice[data-timeout]:not(.js-timeout-done), .form-success[data-timeout]:not(.js-timeout-done), .form-error[data-timeout]:not(.js-timeout-done), .form-warning[data-timeout]:not(.js-timeout-done)').each(function () {
				var wrapper = $(this);
				var delay = parseInt(wrapper.attr('data-timeout'), 10) || 30;
				if (delay < 1) delay = 30;

				// add timeout
				wrapper.prepend('<span class="form-notice__timer js-timeout">' + delay + '</a>');

				// init
				var e = wrapper.find('.js-timeout');
				var timer = setInterval(function () {
					e.show().text(delay);
					if (delay <= 1) {
						clearInterval(timer);
						wrapper.fadeOut(250, function () {
							wrapper.remove();
						});
					}
					delay--;
				}, 1000);

				// done
				wrapper.addClass('js-timeout-done');
			});
		},

		close: function () {
			$('.form-notice.js-notice-close:not(.js-close-done), .form-success.js-notice-close:not(.js-close-done), .form-error.js-notice-close:not(.js-close-done), .form-warning.js-notice-close:not(.js-close-done)').each(function () {
				var wrapper = $(this);
				var allow = true;

				if (wrapper.is('[data-timeout]')) return false;

				// add anchor
				wrapper.prepend('<a class="form-notice__close js-close" href="javascript:void(0)">Close</a>');

				// click
				wrapper.find('.js-close').off('click').on('click', function () {
					if (!allow) return false;
					allow = false;
					wrapper.fadeOut(250, function () {
						wrapper.remove();
					});
					return false;
				});

				// done
				wrapper.addClass('js-timeout-done');
			});

		}

	},

	jqueryUi: {

		init: function () {
			var ui = jQuery.ui;
			if (ui) {
				if (ui.autocomplete) {
					forms.jqueryUi.autocomplete();
				}
				if (ui.datepicker) {
					forms.jqueryUi.datepicker();
				}
			}
		},

		autocomplete: function () {

			$('input[data-autocomplete]:not(.js-autocomplete-done)').each(function () {
				var input = $(this);

				// init
				input.autocomplete({
					source: input.attr('data-autocomplete'),
					//source: temp,
					minLength: 3,
					delay: 100,
					select: function (e, ui) {
						input.val(ui.item.DisplayName);
						popups.loader();
						location.href = '/product/' + ui.item.Name;
						return false;
					}
				}).data('ui-autocomplete')._renderItem = function (ul, item) {
					return $('<li></li>')
						.data('item.autocomplete', item)
						.append(item.DisplayName)
						.appendTo(ul);
				};

				// resize
				site.win.resize(function () {
					input.autocomplete('close');
				});

				// done
				input.addClass('js-autocomplete-done');
			});

		},

		datepicker: function () {
			$('input.js-datepicker:not(.js-datepicker-done)').each(function () {
				var input = $(this);

				// init
				input.datepicker({
					dateFormat: 'dd/mm/yy'
				});

				// min
				if (typeof input.attr('data-min') != 'undefined') {
					input.datepicker('option', 'minDate', input.attr('data-min'));
				}

				// max
				if (typeof input.attr('data-max') != 'undefined') {
					input.datepicker('option', 'maxDate', input.attr('data-max'));
				}

				// done
				input.addClass('js-datepicker-done');
			});
		}

	}

};

$(function () {
	forms.init();
	site.doc.ajaxComplete(function () {
		forms.init();
	});
});