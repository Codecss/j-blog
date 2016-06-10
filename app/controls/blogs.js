/**
 * Created by jiangwei.john@foxmail on 2016/4/6.
 */
var crypto = require('crypto');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');

//blogs 列表页
exports.list = function (req, res, next) {
    /*Post
        .find({}).sort({'date': -1})
        .exec(function (err, blogs) {
            if (err) {
                console.log(err);
            }
            res.render('blogs', {
                title: 'blog',
                posts: blogs,
                postsCategory: getCategory(blogs),
                user: req.session.user
            });
        });*/
    var limit = 4,
        page = req.query.page || 1;
    Post
        .count({}, function (err, count) {
            if (err)console.log(err);
            console.log(count);
            Post
                .find({}, function (err, blogs) {
                    if (err)console.log(err);
                    Post
                        .find({}).sort({'date': -1}).skip((page - 1) * limit).limit(limit)
                        .exec(function (err, posts) {
                            if (err)console.log(err);
                            res.render('blogs', {
                                title: 'blog',
                                count:count,
                                limit:limit,
                                posts: posts,
                                blogs: blogs,
                                page:page,
                                postsCategory: getCategory(blogs),
                                user: req.session.user
                            })
                        })

                })
        })
};
//分类 列表页
exports.sorts = function (req, res, next) {
    var category = req.params.category;
    Post
        .find({category: category}).sort({'date': -1})
        .exec(function (err, blogs) {
            if (err) {
                console.log(err);
            }
            res.render('sorts', {
                title: '标签' + ':' + category,
                posts: blogs,
                user: req.session.user
            });
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
                user: req.session.user
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

