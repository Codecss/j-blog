/**
 * Created by jiangwei.john@foxmail on 2016/4/6.
 */
var mongoose = require('mongoose');
var CommentSchema = require('../schema/comment');
var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;

