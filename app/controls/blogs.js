/**
 * Created by jiangwei.john@foxmail on 2016/4/6.
 */
var crypto = require('crypto');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var Comment = require('../models/comment');


//blogs 列表页
exports.list = function (req, res, next) {
    var limit = 5,
        page = req.query.page || 1;
    Post
        .count({}, function (err, count) {
            if (err)console.log(err);
            Post
                .find({}, function (err, blogs) {
                    if (err)console.log(err);
                    Post
                        .find({}).sort({'date': -1}).skip((page - 1) * limit).limit(limit)
                        .exec(function (err, posts) {
                            if (err)console.log(err);
                            res.render('blogs', {
                                title: 'LIGHTCOLORS',
                                count: count,
                                limit: limit,
                                posts: posts,
                                blogs: blogs,
                                page: page + 1,
                                postsCategory: getCategory(blogs),
                                user: req.session.user
                            })
                        })

                })
        })
};
//search
exports.search = function (req, res, next) {
    var search = req.query.search || '';
    search = new RegExp(search, 'i');

    Post
        .find({title: search, category: search}).sort({'date': -1})
        .exec(function (err, blogs) {
            if (err)console.log(err);
            var domArray = '';
            blogs.forEach(function (blog, index) {
                var dom = '<div data-index="' + index + '" class="">' +
                    '<h3>' + blog.title + '</h3>' +
                    '<div class="">' +
                    '<span class="label label-success inline-block"><i class="glyphicon glyphicon-time"></i>  ' + blog.date + '</span>' +
                    '<span class="label label-info inline-block"><i class="glyphicon glyphicon-user"></i>  ' + blog.name + '</span>' +
                    '<span class="label label-success inline-block"><i class="glyphicon glyphicon-paperclip"></i>  ' + blog.category + '</span>' +
                    '<span class="label label-info inline-block"><i class="glyphicon glyphicon-eye-open"></i> ' + blog.pv + '</span> ' +
                    '</div> ' +
                    '<div class="hr-20"></div> ' +
                    '<div class=""><p>' + blog.intro + '</p></div> ' +
                    '<div class="hr-20"></div> ' +
                    '<div class="text-right"><a class="btn btn-default" href="blogs/' + blog._id + '" target="_blank">MORE</a> </div>' +
                    ' <div class="hr-20"></div> <div class="underline"></div></div>';
                domArray = domArray + dom;
            });
            if (blogs.length > 0) {
                res.send({
                    success: 0,
                    domArray: domArray
                })
            } else {
                res.send({
                    success: 1,
                    error: "未搜索到"
                })
            }
        })
};


//blogs fenye
exports.page = function (req, res, next) {
    var limit = 5,
        page = req.query.page || 1;
    Post
        .count({}, function (err, count) {
            if (err)console.log(err);
            Post
                .find({}).sort({'date': -1}).skip((page - 1) * limit).limit(limit)
                .exec(function (err, blogs) {
                    if (err)console.log(err);

                    var len = blogs.length,
                        domArray = '';
                    blogs.forEach(function (blog, index) {
                        var dom = '<div data-index="' + index + '" class="">' +
                            '<h3>' + blog.title + '</h3>' +
                            '<div class="">' +
                            '<span class="label label-success inline-block"><i class="glyphicon glyphicon-time"></i>  ' + blog.date + '</span>' +
                            '<span class="label label-info inline-block"><i class="glyphicon glyphicon-user"></i>  ' + blog.name + '</span>' +
                            '<span class="label label-success inline-block"><i class="glyphicon glyphicon-paperclip"></i>  ' + blog.category + '</span>' +
                            '<span class="label label-info inline-block"><i class="glyphicon glyphicon-eye-open"></i> ' + blog.pv + '</span> ' +
                            '</div> ' +
                            '<div class="hr-20"></div> ' +
                            '<div class=""><p>' + blog.intro + '</p></div> ' +
                            '<div class="hr-20"></div> ' +
                            '<div class="text-right"><a class="btn btn-default" href="blogs/' + blog._id + '" target="_blank">MORE</a> </div>' +
                            ' <div class="hr-20"></div> <div class="underline"></div></div>';
                        domArray = domArray + dom;
                    });

                    var counts = Math.ceil(count / limit);
                    if (page < counts) {
                        domArray += '<div class="text-center">' +
                            '<div class="hr-20"></div>' +
                            '<button id="blogsPageNext" data-page="' + (parseInt(page) + 1 ) + '" class="btn btn-danger">下一页</button>' +
                            '</div>'
                    }
                    res.send(domArray)
                })

        })
};
//分类 列表页
exports.sorts = function (req, res, next) {
    Post
        .find({}).sort({'date': -1})
        .exec(function (err, blogs) {
            if (err) {
                console.log(err);
            }
            var categoryNum = getCategory(blogs)[0],//带数字
                categoryUrl = getCategory(blogs)[1],
                len = categoryNum.length,
                domArray = '';
            for (var i = 0; i < len; i++) {
                var dom = '<button type="button" data-category="' + categoryUrl[i] + '" class="btn btn-default  inline-block">' + categoryNum[i] + '</button>';
                domArray = domArray + dom;

            }
            blogs.forEach(function (blog, index) {
            });
            res.send(domArray);
        })
};

//标签 获取 blog DOM结构

exports.categoryBlog = function (req, res, next) {
    var limit = 5;
    var page = req.query.page || 1;
    var category = req.query.category;
    Post
        .count({category: category}, function (err, count) {
            Post
                .find({category: category}).skip(page - 1).limit(limit).sort({'date': -1})
                .exec(function (err, blogs) {
                    if (err) {
                        console.log(err);
                    }
                    var len = blogs.length,
                        domArray = '';
                    blogs.forEach(function (blog, index) {
                        var dom = '<div data-index="' + index + '" class="">' +
                            '<h3>' + blog.title + '</h3>' +
                            '<div class="">' +
                            '<span class="label label-success inline-block"><i class="glyphicon glyphicon-time"></i>  ' + blog.date + '</span>' +
                            '<span class="label label-info inline-block"><i class="glyphicon glyphicon-user"></i>  ' + blog.name + '</span>' +
                            '<span class="label label-success inline-block"><i class="glyphicon glyphicon-paperclip"></i>  ' + blog.category + '</span>' +
                            '<span class="label label-info inline-block"><i class="glyphicon glyphicon-eye-open"></i> ' + blog.pv + '</span> ' +
                            '</div> ' +
                            '<div class="hr-20"></div> ' +
                            '<div class=""><p>' + blog.intro + '</p></div> ' +
                            '<div class="hr-20"></div> ' +
                            '<div class="text-right"><a class="btn btn-default" href="blogs/' + blog._id + '" target="_blank">MORE</a> </div>' +
                            ' <div class="hr-20"></div> <div class="underline"></div></div>';
                        domArray = domArray + dom;
                    });
                    var counts = Math.ceil(count / limit);
                    if (page < counts) {
                        domArray += '<div class="text-center">' +
                            '<div class="hr-20"></div>' +
                            '<button id="categoryPageNext" data-page="' + (parseInt(page) + 1 ) + '" class="btn btn-danger">下一页</button>' +
                            '</div>'
                    }
                    res.send(domArray);
                })
        })

};
exports.categoryBlogPage = function (req, res, next) {
    var limit = 5;
    var page = req.query.page || 1;
    var category = req.query.category;
    Post
        .count({category: category}, function (err, count) {
            Post
                .find({category: category}).sort({'date': -1}).skip((page - 1) * limit).limit(limit)
                .exec(function (err, blogs) {
                    if (err) {
                        console.log(err);
                    }
                    var len = blogs.length,
                        domArray = '';
                    blogs.forEach(function (blog, index) {
                        var dom = '<div data-index="' + index + '" class="">' +
                            '<h3>' + blog.title + '</h3>' +
                            '<div class="">' +
                            '<span class="label label-success inline-block"><i class="glyphicon glyphicon-time"></i>  ' + blog.date + '</span>' +
                            '<span class="label label-info inline-block"><i class="glyphicon glyphicon-user"></i>  ' + blog.name + '</span>' +
                            '<span class="label label-success inline-block"><i class="glyphicon glyphicon-paperclip"></i>  ' + blog.category + '</span>' +
                            '<span class="label label-info inline-block"><i class="glyphicon glyphicon-eye-open"></i> ' + blog.pv + '</span> ' +
                            '</div> ' +
                            '<div class="hr-20"></div> ' +
                            '<div class=""><p>' + blog.intro + '</p></div> ' +
                            '<div class="hr-20"></div> ' +
                            '<div class="text-right"><a class="btn btn-default" href="blogs/' + blog._id + '" target="_blank">MORE</a> </div>' +
                            ' <div class="hr-20"></div> <div class="underline"></div></div>';
                        domArray = domArray + dom;
                    });
                    var counts = Math.ceil(count / limit);
                    if (page < counts) {
                        domArray += '<div class="text-center">' +
                            '<div class="hr-20"></div>' +
                            '<button id="categoryPageNext" data-page="' + (parseInt(page) + 1 ) + '" class="btn btn-danger">下一页</button>' +
                            '</div>'
                    }
                    res.send(domArray);
                })
        })
};

//blogs 详情页
exports.detail = function (req, res, next) {
    var id = req.params._id;
    Post.update({_id: id}, {$inc: {pv: 1}}, function (err) {
        if (err) {
            console.log(err);
            res.redirect('/blogs')
        }
    });
    Comment
        .count({blogID: id}, function (err, count) {
            Post
                .findOne({_id: id})
                .exec(function (err, blog) {
                    if (err) {
                        console.log(err);
                        res.redirect('/blogs')
                    }
                    res.render('details', {
                        title: blog.title,
                        post: blog,
                        pageAll: blog.length,
                        user: req.session.user,
                        commentCount: count,
                        comment: req.session.comment
                    })
                })
        })

};
//对 标签进行提取 并显示个数
function getCategory(arguments) {
    var count = 0,
        len = arguments.length,
        temp = [],
        postsNext = [],
        postsNew = [],
        postsLast = [];
    for (var i = 0; i < len; i++) {
        postsNext.push(arguments[i].category);
    }
    for (var i = 0; i < len; i++) {
        if (postsNext[i] != 1) {
            temp = postsNext[i];
            for (var j = 0; j < len; j++) {
                if (temp == postsNext[j]) {
                    count++;
                    postsNext[j] = 1
                }
            }
            postsNew.push(temp + '(' + count + ')');
            postsLast.push(temp);
            count = 0;
        }
    }
    var postsCategory = [postsNew, postsLast];
    return postsCategory
}

