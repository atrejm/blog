const AuthorizedUser = require('../models/authorizedUser');
const Post = require('../models/post')
const Comment = require('../models/comment');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');


exports.comments_get = asyncHandler(async (req, res, next) => {
    // body {post_id: _id}
    // get comments from post id
    const id = req.body.post_id;
    const post = await Post
        .findById(id)
        .populate({path: "comments"})
        .exec();
    console.log(post);

    res.json(post.comments)
});

exports.comment_post = asyncHandler(async (req, res, next) => {
    const { content, author } = req.body;
    
    const comment = new Comment({
        content: content,
        author: author
    });

    await comment.save()

    res.json({
        title:"saved",
    })
});

exports.comment_delete = asyncHandler(async (req, res, next) => {
    const id = req.body.comment_id;
    await Comment.findByIdAndDelete(id);

    res.json({
        message:`Successfully deleted message with id:${id}`,
    })
});
