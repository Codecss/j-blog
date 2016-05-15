/**
 * Created by jiangwei.john@foxmail on 2016/4/6.
 */
var crypto = require('crypto');
var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.showSignIn = function (req, res, next) {
    res.render('login', {
        title: '登录',
        user: req.session.user
    });
};
exports.signIn = function (req, res, next) {
    var username = req.body.username,
        password = req.body.password;
    //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(password).digest('hex');
    //检查用户是否存在
    User
        .findOne({username: username})
        .exec(function (err, user) {
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
};

exports.showSignUp = function (req, res, next) {
    res.render('register', {
        title: '注册',
        user: req.session.user
    });
};
exports.signOut = function (req, res, next) {
    req.session.user = null;
    res.redirect('/');
}
exports.signUp = function (req, res, next) {
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
    User
        .findOne({username: newUser.username})
        .exec(function (err, user) {
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
        })
};
/*

 exports.save = function (callback) {
 var md5 = crypto.createHash('md5'),
 email_MD5 = md5.update(this.email.toLowerCase()).digest('hex'),
 head = "http://www.gravatar.com/avatar/" + email_MD5 + "?s=48";
 var user = {
 username: this.username,
 password: this.password,
 email: this.email,
 power: this.power,
 head: head
 };

 var newUser = new User(user);

 newUser.save(function (err, user) {
 if (err) {
 return callback(err);
 }
 callback(null, user);
 });
 };

 exports.get = function (username, callback) {
 User.findOne({username: username}, function (err, user) {
 if (err) {
 return callback(err);
 }
 callback(null, user);
 });
 };*/
