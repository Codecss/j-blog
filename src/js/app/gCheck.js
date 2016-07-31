/**
 *
 * TODO Created by http://www.lightcolors.cn on 16/7/18.
 *
 */

define(['jquery'], function () {
    jQuery.fn.gAlert = function (config) {
        var fn = function () {
        };
        var defaults = {
            title: '',
            info: '',
            btn: 0,
            width: '500px',
            success: fn,
            cancel: fn,
            callback: fn
        };
        defaults = $.extend(defaults, config);
        var btnDom = '';
        switch (defaults.btn) {
            case 0:
                btnDom = '';
                break;
            case 1:
                btnDom = '<button id="btnSuccess" class="btn btn-success">确定</button>';
                break;
            case 2:
                btnDom = '<button id="btnSuccess" class="btn btn-success">确定</button>&nbsp;&nbsp;<button id="btnCancel" class="btn btn-default">取消</button>';
                break;
            default:
                btnDom = '<button id="btnSuccess" class="btn btn-success">确定</button>';
        }
        var alertDom = '<div class="ui-alert-cover"></div>' +
            '<div class="ui-alert">' +
            '<div class="ui-alert-title"><h2>' + defaults.title + '</h2></div>' +
            '<div class="ui-alert-info"><p>' + defaults.info + '</p></div>' +
            '<div class="ui-alert-btn">' + btnDom + '</div>' +
            '</div>';
        var doc = $(document),
            win = $(window),
            bd = $('body');

        bd.append(alertDom);
        function showAlert() {
            var ui = $('.ui-alert');
            ui.css({'width': defaults.width});
            var winWidth = win.width(),
                winHeight = win.height(),
                uiWidth = ui.innerWidth(),
                uiHeight = ui.innerHeight();

            $('html,body').css({
                'width': '100%',
                'height': '100%'
            });
            ui.css({
                'left': (winWidth - uiWidth ) / 2,
                'top': (winHeight - uiHeight) / 2
            });
            success();
            cancel();
            $('.ui-alert-cover').on('click', function () {
                hideAlert()
            })
        }

        showAlert();
        win.resize(function () {
            showAlert();
        });

        function success() {
            $('#btnSuccess').on('click', function () {
                hideAlert();
                defaults.success();
            })

        }

        function cancel() {
            $('#btnCancel').on('click', function () {
                hideAlert();
                defaults.cancel();
            })
        }

        function hideAlert() {
            bd.children('.ui-alert,.ui-alert-cover').remove();
            $('.ui-alert-cover').on('click', function () {
                bd.children('.ui-alert,.ui-alert-cover').remove();
            })
        }
    }
});
