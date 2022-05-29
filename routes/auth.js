//using router function of express js
const router = require('express').Router();
//import User model
const User = require("../models/User");
//use crypto js for password encryption
const CryptoJS = require("crypto-js");
// using jwt to security
const jwt = require("jsonwebtoken");

//register 
router.post("/register", async (req, res) => {

    //getting data from end-user
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });

    //sending data to mongoDB
    try {
        const savedUser = await newUser.save();
        //sending user to client side
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }


});

//login
router.post("/login", async (req, res) => {

    try {
        //find if user inside mongoDB with condition
        const user = await User.findOne({ username: req.body.username });
        //if user not found, send response
        if(!user) return res.status(401).json("User not found!");

        //get password - original and entered
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;

        //find if password matches or not , if not send response
        originalPassword !== inputPassword && res.status(401).json("Wrong password");

        // if everything ok, create JWT
        // here we will match user id and also giving expiry time for this token.
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        },
         process.env.JWT_SEC,
         {expiresIn: "3d"}
        );

        //destrucutre password and others fields
        const {password, ...others} = user._doc;

        // send response (without password)
        res.status(200).json({...others, accessToken});

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
