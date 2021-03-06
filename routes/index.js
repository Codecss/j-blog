var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var Index = require('../app/controls/index');
var User = require('../app/controls/user');
var Post = require('../app/controls/post');
var Blogs = require('../app/controls/blogs');
var Comment = require('../app/controls/comment');

/* GET home page. */

router.get('/', Blogs.list);
router.get('/about', Index.about);

/*博客list*/
router.get('/blogs', Blogs.list);
router.get('/blogs/page', Blogs.page);

/*search*/
router.get('/blogs/search',Blogs.search);

/*分类 list*/
router.get('/blogs/sorts', Blogs.sorts);
router.get('/blogs/sorts/category', Blogs.categoryBlog);
router.get('/blogs/sorts/category/page', Blogs.categoryBlogPage);

/*分类 详情页*/
router.get('/blogs/sorts/blogs/:_id', Blogs.detail);
/*详情页*/
router.get('/blogs/:_id', Blogs.detail);

/*评论*/
router.post('/blogs/:_id/comment', Comment.commentPost);
router.get('/blogs/:_id/comment', Comment.commentShow);


/*登录*/
router.get('/login', checkNotLogin, User.showSignIn);
router.post('/login', checkNotLogin, User.signIn);

/*登出*/
router.get('/logout', User.signOut);

/*注册*/
router.get('/register', checkNotLogin, User.showSignUp);
router.post('/register', checkNotLogin, User.signUp);

/*发表*/
router.get('/post', checkLogin, checkPermissions, Post.showPost);
router.post('/post', checkLogin, Post.post);
/*后台管理*/
router.get('/edit', checkLogin, checkPermissions, Post.showEdit);
router.delete('/edit', checkLogin, checkPermissions, Post.del);

router.get('/edit/update/:id', checkLogin, checkPermissions, Post.showUpdate);
router.post('/edit/update/:id', checkLogin, checkPermissions, Post.update);

router.use(function (req, res) {
    res.render("404");
});

function checkLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect('/login');
    }
    next();
}

function checkNotLogin(req, res, next) {
    if (req.session.user) {
        res.redirect('back');//返回之前的页面
    }
    next();
}
function checkPermissions(req, res, next) {
    if (!req.session.user.power) {
        res.redirect('back');//返回之前的页面
    }
    next();
}

module.exports = router;