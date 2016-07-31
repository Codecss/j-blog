/**
 *
 * TODO Created by http://www.lightcolors.cn on 16/7/18.
 *
 */
define(function (require, exports, module) {
    var $ = require('jquery'),
        gAlert = require('gAlert');

    jQuery.fn.gAjax = function (config) {
        "use strict";
        var fn =            function () {

            },
            bd =            $('body'),
            doc =           $(document),
            win =           $(window),
            _this =         $(this),
            beforeSend =    fn,
            complete =      fn;

        var defaults = {
            type:           'GET',
            url:            '',
            async:          true,
            data:           null,
            loading:        0,
            beforeSend:     fn,
            success:        fn,
            complete:       fn,
            error:          fn,
            callback:       fn
        };
        defaults = $.extend(defaults, config);

        switch (defaults.loading) {
            case 0:
            default:
                beforeSend = function () {
                    _this.attr('disabled', 'disabled').append('a');
                };
                complete = function () {
                    _this.removeAttr('disabled');
                };
                break;
            case 1:
                beforeSend = function () {
                    _this.attr('disabled', 'disabled');
                };
                complete = function () {
                    _this.removeAttr('disabled');
                };
                break;
            case 2:
                beforeSend = function () {
                    _this.attr('disabled', 'disabled');
                };
                complete = function () {
                    _this.removeAttr('disabled');
                };
                break;
        }
        $.ajax({
            type:               defaults.type || 'GET',
            url:                defaults.url || win.location.href,
            async:              defaults.async,
            data:               defaults.data,
            beforeSend:         function () {
                                    defaults.beforeSend();
                                    beforeSend();
            },
            complete:           function (config) {
                                    defaults.complete(config);
                                    complete();
            },
            success:            function (config) {
                                    defaults.success(config);
            },
            error:              function () {
                                    defaults.error();
            }
        });
        defaults.callback(config);
    }
});
