const AuthorizedUser = require('../models/authorizedUser');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.login = asyncHandler(async (req, res, next) => {
    const user = await AuthorizedUser.findOne({username:req.body.username, password:req.body.password})

    console.log(req.body);

    if(user) {
        const token = jwt.sign({ sub: user._id }, "secretkey", { expiresIn: '1h'})
        res.json({jwtToken:token,
                user: user});
    } else {
        res.json({message: "Authentication failed",
                authenticated: false});
    }
});

exports.login_authenticated = [
    async (req, res, next) => {
        next();
    },

    passport.authenticate('jwt', {session: false})
    ,
    asyncHandler(async (req, res, next) => {
        res.json("You have acess to this protected route!")
})];