/**
 * Created by Ironman on 16/7/31.
 */
require(['jquery', 'gAlert', 'gAjax'], function ($, gAlert, gAjax) {
    (function ($) {
        var href = window.location.href;
        var url = '/blogs/' + (href.split('/')[4]) + '/comment',
            result = null;

        $().gAjax({
            type: 'GET',
            url: url,
            success: function (dom) {
                $('#commentsShow').append(dom)
            },
            error: function () {
                $().gAlert({
                    title: '',
                    info: '评论加载超时,请刷新',
                    btn: 1,
                    width: '200px'
                })
            }
        });

        var name = $('#commentName').html(),
            commentName = $('[name = commentName]'),
            commentContent = $('[name = commentContent]'),
            commentNameVal = commentName.val() || name,
            commentContentVal = commentContent.val();

        function validateName(name) {
            var re = name;
            if (re.length >= 4 && re.length <= 8) {
                return true;
            } else {
                return false;
            }
        }

        function validateContent(content) {
            var re = content;

            if (re.length > 0) {
                return true;
            } else {
                return false;
            }
        }

        function commentContentCheck() {
            commentContentVal = commentContent.val();
            if (validateContent(commentContentVal)) {
                commentContent.parent().removeClass('has-error').addClass('has-success')
            } else {
                commentContent.parent().removeClass('has-success').addClass('has-error')
            }
        }

        function commentNameCheck() {
            commentNameVal = commentName.val() || name;
            if (validateName(commentNameVal)) {
                commentName.parent().removeClass('has-error').addClass('has-success')
            } else {
                commentName.parent().removeClass('has-success').addClass('has-error')
            }
        }

        commentName.on('keyup', function () {
            commentNameCheck();
        });
        commentContent.on('keyup', function () {
            commentContentCheck();
        });
        $('#commentForm').on('click', 'button', function (e) {
            commentNameVal = commentName.val() || name;
            commentContentVal = commentContent.val();
            var result = null;
            commentNameCheck();
            commentContentCheck();

            if (validateName(commentNameVal) && validateContent(commentContentVal)) {
                $().gAjax({
                    type: 'POST',
                    url: url,
                    async: false,
                    data: {
                        commentName: commentNameVal,
                        commentContent: commentContentVal
                    },
                    success: function (req) {
                        switch (req.success) {
                            case '0':
                                /*未通过验证*/
                                commentName.parent().removeClass('has-success').addClass('has-error');
                                commentContent.parent().removeClass('has-success').addClass('has-error');
                                break;
                            case '1':
                                $().gAlert({
                                    title: '',
                                    info: req.error,
                                    btn: 1,
                                    width: '200px'
                                });
                                break;
                            case '2':
                                $('#commentNameDom').children().remove();
                                var commentShow = $('#commentsShow'),
                                    dom = '';

                                var index = commentShow.children().length;
                                dom = '<div class="media">' +
                                    '<div class="media-left">' +
                                    '<a>#' + (index + 1) + '</a>' +
                                    '</div>' +
                                    '<div class="media-body">' +
                                    '<h4 class="media-heading">' + commentNameVal + '</h4>' +
                                    '<small>' + commentContentVal + '</small>' +
                                    '</div></div>';
                                commentShow.append(dom);
                                var commentCounts = $('#commentCount');
                                var commentCount = commentCounts.html();
                                commentCounts.html(parseInt(commentCount) + 1);
                                return result = req.result;
                                break;
                        }
                    },
                    error: function () {
                        $().gAlert({
                            title: '',
                            info: '加载超时,请重试',
                            btn: 1,
                            width: '200px'
                        })
                    },
                    callback: function () {
                        $('#commentNameDom').append(result);
                        commentContent.val('')
                    }
                });
                return result;
            }
        })
    })(jQuery)
});