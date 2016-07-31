/**
 * Created by jiangwei.john@foxmail on 2016/4/6.
 */
var crypto = require('crypto');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var Comment = require('../models/comment');

exports.commentShow = function (req, res, next) {
    var blogID = req.params._id;
    Comment
        .count({blogID: blogID}, function (err, count) {
            if (err)console.log(err);
            Comment
                .find({blogID: blogID})
                .exec(function (err, comments) {
                    if (err)console.log(err);

                    var len = comments.length,
                        domArray = '';
                    comments.forEach(function (comment, index) {
                        var dom = '<div class="media">' +
                            '<div class="media-left">' +
                            '<a>#' + (index + 1) + '</a>' +
                            '</div>' +
                            '<div class="media-body">' +
                            '<h4 class="media-heading">' + comment.commentName + '</h4>' +
                            '<small>' + comment.commentContent + '</small>' +
                            '</div></div>';
                        domArray += dom;
                    });
                    res.send(domArray)
                })

        })

};
exports.commentPost = function (req, res, next) {
    var commentName = req.body.commentName || req.session.comment.commentName,
        commentContent = req.body.commentContent || '',
        blogID = req.params._id,
        date = getTime(new Date());

    var newComment = new Comment({
        commentName: commentName,
        commentContent: commentContent,
        blogID: blogID,
        date: date
    });

    if (validateName(commentName) && validateContent(commentContent)) {
        Comment
            .findOne({commentContent: commentContent})
            .exec(function (err, comment) {
                console.log(comment);
                if (comment !== null) {
                    res.send({
                        success: '1',
                        error: '不可重复评论'
                    })
                } else {
                    var result = '<div class="form-group">' +
                        '<font>*</font><label for="commentName">' + commentName + '</label></div>';
                    newComment.save(function (err, user) {
                        if (err) console.log(err);
                        req.session.comment = newComment;//用户信息存入 session
                        res.send({
                            success: '2',
                            result: result
                        });
                    });
                }
            });
    } else {
        res.send({
            success: '0'
        })
    }


};


function validateName(name) {
    var re = name;
    if (re.length >= 4 && re.length <= 8) {
        return true;
    } else {
        return false;
    }
}

function validateContent(content) {
    var re = content;
    if (re.length > 0) {
        return true;
    } else {
        return false;
    }
}
function getTime(date) {
    var year = date.getFullYear(),
        mouth = date.getMonth() + 1,
        day = date.getDate(),
        hours = date.getHours(),
        min = date.getMinutes(),
        second = date.getSeconds();
    var time = year + '-' + get(mouth) + '-' + get(day) + ' ' + get(hours) + ':' + get(min) + ':' + get(second);

    function get(time) {
        if (time < 10) {
            return time = '0' + time
        } else {
            return time
        }
    }

    return time
}

