/**
 * Created by Ironman on 16/7/31.
 */
require(['jquery', 'gAlert', 'gAjax'], function ($, gAlert, gAjax) {
    (function ($) {
        var category = null;
        $().gAjax({
            type: "GET",
            url: "/blogs/sorts",
            loading: 0,
            success: function (dom) {
                $('#categoryBlog').append(dom)
            },
            error: function () {
                $().gAlert({
                    title: '',
                    info: '标签加载超时,请刷新',
                    btn: 1,
                    width: '200px'
                })
            }
        });
        $('#searchBtn').on('click', function (e) {
            var search = $('[name=searchContent]'),
                searchVal = search.val(),
                result = null;
            $().gAjax({
                type: 'GET',
                url: '/blogs/search?search=' + searchVal,
                async: false,
                beforeSend: function () {
                },
                success: function (config) {
                    if (config.success === 0) {
                        $('#categoryBlogGetAct').children().remove();
                        return result = config.domArray;
                    } else if (config.success === 1) {
                        $().gAlert({
                            title: '',
                            info: config.error,
                            btn: 1,
                            width: '200px'
                        })
                    }
                },
                error: function () {
                    $().gAlert({
                        title: '',
                        info: '搜索超时,请重试',
                        btn: 1,
                        width: '200px'
                    })
                },
                callback: function () {
                    $('#categoryBlogGetAct').append(result);
                    return result = null;
                }
            });
        });
        $('#categoryBlog').on('click', 'button', function (e) {
            var target = $(e.target);
            category = target.data('category');
            var result = null;
            $().gAjax({
                type: 'GET',
                url: '/blogs/sorts/category?category=' + category,
                async: false,
                beforeSend: function () {
//                        $('#categoryBlogGetAct').append(config);
                },
                success: function (config) {
                    $('#categoryBlogGetAct').children().remove();
                    return result = config;
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
                    $('#categoryBlogGetAct').append(result);
                }
            });
            return category;
        });
        $('#categoryBlogGetAct').on('click', "button", function (e) {
            var target = $(e.target);
            var page = target.data('page');
            var result = null;
            var id = target.attr('id');
            switch (id) {
                case 'blogsPageNext':
                    $().gAjax({
                        type: 'GET',
                        url: '/blogs/page?page=' + page,
                        async: false,
                        beforeSend: function () {
                        },
                        success: function (config) {
                            $('#categoryBlogGetAct').children().remove();
                            return result = config;
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
                            $('#categoryBlogGetAct').append(result)
                        }
                    });
                    break;
                case 'categoryPageNext':
                    $().gAjax({
                        type: 'GET',
                        url: '/blogs/sorts/category/page?page=' + page,
                        async: false,
                        data: {
                            category: category
                        },
                        beforeSend: function () {
                        },
                        success: function (config) {
                            $('#categoryBlogGetAct').children().remove();
                            return result = config;
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
                            $('#categoryBlogGetAct').append(result)
                        }
                    });
                    return category = null;
                    break;
            }

        })
    })(jQuery)
});