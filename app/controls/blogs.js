/**
 * Created by jiangwei.john@foxmail on 2016/4/6.
 */
var crypto = require('crypto');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');

//blogs 列表页
exports.list = function (req, res, next) {
    Post
        .find({}).sort({'date': -1})
        .exec(function (err, blogs) {
            if (err) {
                console.log(err);
            }
            res.render('blogs', {
                title: 'blog',
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

