/**
 * Created by jiangwei.john@foxmail on 2016/4/6.
 */
var crypto = require('crypto'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId,

    CommentSchema = new Schema({
        blogID: {
            type: ObjectId
        },
        commentContent: {
            type: String
        },
        commentName: {
            type: String
        },
        date: {
            type: String
        }
    });
module.exports = CommentSchema;

