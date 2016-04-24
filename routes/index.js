var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');
var Post = require('../models/post.js');

/* GET home page. */
router.get(function (req, res, next) {

    next();
});
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Lightcolors',
        user: req.session.user
    });
});
router.get('/about', function (req, res, next) {
    res.render('about', {
        title: 'aboutMe',
        user: req.session.user
    })
});

/*博客list*/
router.get('/blogs', function (req, res, next) {
    var page = parseInt(req.query.page) || 2;
    console.log(page);
    Post.getAll(function (err, posts) {
        res.render('blogs', {
            title: 'blog',
            posts: posts,
            user: req.session.user
        });
    });
});
/*new*/
router.get('/blogLater', function (req, res, next) {
    var page = parseInt(req.query.page) || 2;
    console.log(page);
    Post.getAll(function (err, posts) {
        res.render('blogLater', {
            title: 'blog',
            posts: posts,
            user: req.session.user
        });
    });
});
/*详情页*/
router.get('/blogs/:_id', function (req, res, next) {
    Post.getOne(req.params._id, function (err, post) {
        if (err) {
            console.log(err);
            res.redirect('/blogs')
        }
        res.render('details', {
            title: post.title,
            time: post.date,
            post: post,
            pageAll: post.length,
            user: req.session.user
        })
    })
});


/*登录*/
router.get('/login', checkNotLogin);
router.get('/login', function (req, res, next) {
    res.render('login', {
        title: '登录',
        user: req.session.user
    });
});
router.post('/login', checkNotLogin);
router.post('/login', function (req, res, next) {
    var username = req.body.username,
        password = req.body.password;
    //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(password).digest('hex');
    //检查用户是否存在
    User.get(username, function (err, user) {
        if (!user) {
            return res.redirect('/login');//用户不存在则跳转到登录页
        }
        //检查密码是否一致
        if (user.password != password) {
            return res.redirect('/login');//密码错误则跳转到登录页
        }
        //用户名密码都匹配后，将用户信息存入 session
        req.session.user = user;
        console.log(user);
        //req.flash('success', '登陆成功!');
        res.redirect('/blogs');//登陆成功后跳转到主页
    });
});

/*登出*/
router.get('/logout', function (req, res, next) {
    req.session.user = null;
    res.redirect('/');
});

/*注册*/
router.get('/register', checkNotLogin);
router.get('/register', function (req, res, next) {
    res.render('register', {
        title: '注册',
        user: req.session.user
    });
});
router.post('/register', checkNotLogin);
router.post('/register', function (req, res, next) {
    var username = req.body.username,
        password = req.body.password,
        password_re = req.body['password-re'],
        email = req.body.email;
    if (username.length == 0) {
        return res.redirect('/register');//返回注册页
    }
    //检验用户两次输入的密码是否一致
    if (password_re != password) {
        //req.flash('error', '两次输入的密码不一致!');
        return res.redirect('/register');//返回注册页
    }
    //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
        username: username,
        password: password,
        email: email
    });
    console.log(newUser);
    //检查用户名是否已经存在
    User.get(newUser.username, function (err, user) {
        if (err) {
            console.log('error', err);
            return res.redirect('/register');
        }
        if (user) {
            return res.send('用户已存在!');
        }
        //如果不存在则新增用户
        newUser.save(function (err, user) {
            if (err) {
                req.send('error', err);
                return res.redirect('/register');//注册失败返回主册页
            }
            req.session.user = newUser;//用户信息存入 session
            res.redirect('/blogs');//注册成功后返回主页
        });
    });
});

/*发表*/
router.get('/post', checkLogin);
router.get('/post', checkPermissions);
router.get('/post', function (req, res, next) {
    res.render('post', {
        title: '发表',
        user: req.session.user
    });
});
router.post('/post', checkLogin);
router.post('/post', function (req, res, next) {
    var currentUser = req.session.user,
        post = new Post({
            name: currentUser.username,
            title: req.body.title,
            intro: req.body.intro,
            category: req.body.category,
            post: req.body.post
        });
    console.log(post);
    post.save(function (err) {
        if (err) {
            return res.redirect('/');
        }
        res.redirect('/blogs');//发表成功跳转到主页
    });
});
/*后台管理*/
router.get('/edit', checkLogin);
router.get('/edit', checkPermissions);
router.get('/edit', function (req, res, next) {
    Post.getAll(function (err, posts) {
        res.render('edit', {
            title: '后台管理',
            posts: posts,
            user: req.session.user
        });
    });
});
router.post('/edit', checkLogin);
router.post('/edit', function (req, res, next) {
});
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