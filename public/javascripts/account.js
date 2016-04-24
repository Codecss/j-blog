/**
 * Created by Ironman on 16/4/1.
 */
function signup() {
    if (!simpleValidate()) return;
    var password = $('[name=password]').val();
    var password1 = $('#password1').val();

    $.post('', $('.form').serialize())
        .done(info)
        .fail(function (res) {
            warn('.alert-name', (res.responseText));
        });
}

function simpleValidate() {
    var username = $('[name=username]').val().trim();
    var password = $('[name=password]').val();
    var email = $('[name=email]').val();
    var password1 = $('#password1').val() || '';

    if (username.length === 0) {
        warn('.alert-name', '用户名不能为空!');
        return false;
    } else if (username.length > 8 || username.length < 4) {
        warn('.alert-name', '用户名4-8个字符!');
        return false;
    } else {
        pass('.alert-name');
    }
    if (password.length === 0) {
        warn('.alert-password', '密码不能为空!');
        return false;
    } else {
        pass('.alert-password');
    }
    if (password1.length === 0) {
        warn('.alert-password-re', '重复密码不能为空!');
        return false;
    } else {
        pass('.alert-password-re');
    }
    if (password != password1) {
        warn('.alert-password-re', '两次输入的密码不一致');
        return;
    } else {
        pass('.alert-password-re');
    }
    if (!validateEmail(email)) {
        warn('.alert-email', '邮件不合法!');
        return false;
    } else {
        pass('.alert-email');
    }
    return true;
}

function warn(obj, msg) {
    $(obj).hide();
    $(obj + '-danger').html(msg).show().css({
        'color': '#F35E0E',
        'padding-left': '30px'
    });
}
function pass(obj) {
    $(obj).hide();
    $(obj + '-danger').hide();
}

function info(msg) {
    $('.alert').hide();
    $('.alert-success').html(msg).show();
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
(function () {
    var i = $(window).height(), o = $("<div>").addClass("backToTop").hide();

    $("body").append(o);
    $(".backToTop").on("click", function () {
        $("html,body").animate({
            scrollTop: 0
        },500);
    });
    $(window).on("resize", function () {
        i = $(window).height()
    }).on("scroll", function () {
        $(this).scrollTop() > i ? $(".backToTop").show() : $(".backToTop").hide()
    });
})();