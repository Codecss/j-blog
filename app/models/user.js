/**
 * Created by jiangwei.john@foxmail on 2016/4/6.
 */
var mongoose = require('mongoose');
var UserSchema = require('../schema/user');
var User = mongoose.model('User', UserSchema);

module.exports = User;