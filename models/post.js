/**
 * Created by jiangwei on 2016/4/6.
 */
var crypto = require('crypto'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId,

    PostSchema = new Schema({
        name: String,
        title: {
            type: String,
            unique: true
        },
        pv: {
            type: Number,
            default: 0
        },
        intro: String,//简介
        category: String, //分类
        post: String,//内容
        date: {
            type: Date
            //default: Date.now()
        }//时间
    }),

    postModel = mongoose.model('Post', PostSchema);

function Post(post) {
    this.name = post.name;
    this.title = post.title;
    this.intro = post.intro;
    this.category = post.category;
    this.post = post.post;
    this.date = post.date
}

Post.prototype.save = function (callback) {
    var date = new Date();
    var time = {
        date: date,
        year: date.getFullYear(),
        month: date.getFullYear() + '-' + (date.getMonth() + 1),
        day: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay(),
        minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    };
    var post = {
        name: this.name,
        title: this.title,
        intro: this.intro,
        category: this.category,
        post: this.post,
        date: time.minute
    };

    var newPost = new postModel(post);
    //var _id = new newPost.ObjectId;

    newPost.save(function (err, post) {
        if (err) {
            return callback(err);
        }
        callback(null, post);
    });
};
Post.del = function () {
    postModel.find

};

Post.getOne = function (_id, callback) {
    postModel.findOne({_id: _id}, function (err, doc) {
        if (err) {
            console.log(err);
        }
        callback(null, doc)
    }).update({$inc: {"pv": 1}}, function (err) {
    })

};
Post.getTen = function (index, callback) {
    postModel.find({}, function (err, post) {
        if (err) {
            return callback(err);
        }
        callback(null, post);
    }).sort({'_id': -1}).skip(index * 5).limit(5);
};

Post.getAll = function (callback) {
    postModel.find({}, function (err, post) {
        if (err) {
            return callback(err);
        }
        callback(null, post);
    }).sort({'_id': -1})
};

module.exports = Post;