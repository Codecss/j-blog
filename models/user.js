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
    email: String
});

var userModel = mongoose.model('User', UserSchema);

function User(user) {
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
}

User.prototype.save = function (callback) {
    var md5 = crypto.createHash('md5'),
        email_MD5 = md5.update(this.email.toLowerCase()).digest('hex'),
        head = "http://www.gravatar.com/avatar/" + email_MD5 + "?s=48";
    var user = {
        username: this.username,
        password: this.password,
        email: this.email,
        head: head
    };

    var newUser = new userModel(user);

    newUser.save(function (err, user) {
        if (err) {
            return callback(err);
        }
        callback(null, user);
    });
};

User.get = function (username, callback) {
    userModel.findOne({username: username}, function (err, user) {
        if (err) {
            return callback(err);
        }
        callback(null, user);
    });
};

module.exports = User;


