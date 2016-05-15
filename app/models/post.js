/**
 * Created by jiangwei.john@foxmail on 2016/4/6.
 */
var mongoose = require('mongoose');
var PostSchema = require('../schema/post');
var Post = mongoose.model('Post', PostSchema);

module.exports = Post;

