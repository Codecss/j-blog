/**
 * Created by jiangwei.john@foxmail on 2016/4/6.
 */
var crypto = require('crypto');
var mongoose = require('mongoose');
var User = require('../models/user');
var Post = require('../models/post');

exports.index = function (req, res, next) {
    res.render('index', {
        title: 'Lightcolors',
        user: req.session.user
    })
};exports.about = function (req, res, next) {
    res.render('about', {
        title: 'aboutMe',
        user: req.session.user
    })
};