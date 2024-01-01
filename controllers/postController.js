const Post = require('../models/post');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.all_posts = asyncHandler(async (req, res, next) => {
    const posts = await Post.find({}).exec();

    res.json(posts);
});

exports.post_get = asyncHandler(async (req, res, next) => {
    
    res.json({
        title:"not implemented yet",
        id: req.params.id    
    })
})

exports.post_post = [
    body("title").trim().escape(),

    body("content").trim().escape(),
    
    passport.authenticate('jwt', {session: false}),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        console.log(req.user);
        

        if (!errors.isEmpty()){
            //Inavlid
            console.error("Failed Validation...");
            res.json({
                status:"Validation Errors",
                error:errors
            });

        } else {
            const title = req.body.title;
            const content = req.body.content;
            console.log(req.body);
    
            const post = new Post({
                title: title,
                content: content,
            })
    
            await post.save();
    
            res.json({
                status:"Validated and added to DB",
                post_id: post._id,
                error:false    
            }) 
        }
    }
)];

exports.post_put = asyncHandler(async (req, res, next) => {
    
    res.json({
        title:"not implemented yet",
        id: req.params.id    
    })
})

exports.post_delete = asyncHandler(async (req, res, next) => {
    
    console.log(req.body.id);
    const post = await Post.findById(req.body.id);

    if (post) {
        await Post.deleteOne({_id: req.body.id});

        res.json({
            status:`${req.body.id} successfully deleted`,    
        })
    } else {
        res.json({
            status:`${req.body.id} not delted, are you sure this is a real ID?`
        })
    }

    
})