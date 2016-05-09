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
    });
module.exports = PostSchema;

