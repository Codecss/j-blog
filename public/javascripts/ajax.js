/**
 * Created by jiangwei.john@foxmail on 2016/4/6.
 */

var gBlog = {};
gBlog.getAjax = function () {

};
gBlog.getAjax.prototype = {
    //标签获取对应文章
    categoryGetBlog: function (parent) {
        parent.on('click', 'button', function (e) {
            var target = $(e.target);
            var url = target.data('category');
            $.ajax({
                    type: "GET",
                    url: "/blogs/sorts/blogs?category=" + url,
                    beforeSend: function () {
                        $('#categoryBlogGetAct').children().remove();
                    }

                })
                .done(function (dom) {
                    $('#categoryBlogGetAct').prepend(dom)

                })
        })
    },

    //博客页获取标签
    blogGetCategory: function (parent) {
        $.ajax({
                type: "GET",
                url: "/blogs/sorts"
            })
            .done(function (dom) {
                parent.append(dom)
            })

    }


};