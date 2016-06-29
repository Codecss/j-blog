/**
 * Created by jiangwei.john@foxmail on 2016/4/6.
 */
var crypto = require('crypto');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

exports.showPost = function (req, res, next) {
    res.render('post', {
        title: '发表',
        posts: {},
        user: req.session.user
    });
};

exports.post = function (req, res, next) {
    var date = getTime(new Date());
    console.log(date);
    var currentUser = req.session.user,
        post = new Post({
            name: currentUser.username,
            title: req.body.title,
            intro: req.body.intro,
            category: req.body.category,
            post: req.body.post,
            date: date
        });
    console.log(post);
    post.save(function (err) {
        if (err) {
            return res.redirect('/post');
        }
        res.redirect('/blogs');//发表成功跳转到主页
    });
};

exports.showEdit = function (req, res, next) {
    Post
        .find({})
        .exec(function (err, blogs) {
            res.render('edit', {
                title: '后台管理',
                posts: blogs,
                user: req.session.user
            });
        })
};

exports.del = function (req, res, next) {
    var id = req.query.id;
    Post
        .findOne({_id: id})
        .exec(function (err, blogs) {
            if (err) console.log(err);
            blogs.remove();
            res.json({success: 1})

        })
};
exports.showUpdate = function (req, res, next) {
    var id = req.params.id;
    Post
        .findOne({_id:id})
        .exec(function (err, blogs) {
            if (err) console.log(err);
            res.render('update', {
                title: '编辑',
                posts: blogs,
                user: req.session.user
            });
        })
};
exports.update = function (req, res, next) {
    var id = req.params.id;
    var date = getTime(new Date());
    var blogs = {
        title: req.body.title,
        category: req.body.category,
        date: date
    };
    Post
        .findOne({_id: id})
        .exec(function (err, blog) {
            if (err) console.log(err);
            Post.update({_id: id}, blogs, function (err) {
                if (err) console.log(err)
            });
            res.redirect('/blogs');//发表成功跳转到主页
        })
};
function getTime(date) {
    var year = date.getFullYear(),
        mouth = date.getMonth() + 1,
        day = date.getDate(),
        hours = date.getHours(),
        min = date.getMinutes(),
        second = date.getSeconds();
    var time = year + '-' + get(mouth) + '-' + get(day) + ' ' + get(hours) + ':' + get(min) + ':' + get(second);

    function get(time) {
        if (time < 10) {
            return time = '0' + time
        } else {
            return time
        }
    }

    return time
}