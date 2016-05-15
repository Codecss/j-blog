/**
 * Created by jiangwei.john@foxmail on 2016/4/6.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    email: String,
    power: {
        type: Number,
        default: 0
    }
});


module.exports = UserSchema;