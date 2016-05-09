/**
 * Created by Ironman on 16/4/2.
 */
var crypto = require('crypto');
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


