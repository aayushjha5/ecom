//importing verifyToken function
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const User = require("../models/User");

//using router function of express js
const router = require('express').Router();

//UPDATE user
//as UPDATING, so 'put' ; :id used for specific user ; middleware used to verify jwt
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    //encrypting password so user can change it
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    }

    //now update the user
    try {

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                //give new info to user 
                $set: req.body
            },
            { new: true }
        );

        //send updatedUser details to enduser
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

//DELETE user
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) =>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account Deleted!");
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET user  (only by admin)
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) =>{
    try {
       const user = await User.findById(req.params.id);
       const {password, ...others} = user._doc;
       // send response (without password)
       res.status(200).json({others});
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET all users (only by admin)
router.get("/", verifyTokenAndAdmin, async (req, res) =>{
    const query = req.query.new;
    try {
        //added a query to find recent 5 new users 
       const users =  query? await User.find().sort({_id:-1}).limit(5) :await User.find();
       res.status(200).json({users});
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET user stats 
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {

    //GET TOTAL NO OF USERS REGISTERED EVERY MONTH BY MONTH ID
    const date = new Date(); // today's date
    const lastYear =  new Date(date.setFullYear(date.getFullYear()-1));//last year today
    try {
        //group item by mongoDB aggregate
        const data = await User.aggregate([
            //condition
            {$match: {createdAt : {$gte:lastYear}}},
            //taking month nos.
            {
                $project:{
                    month: {$month : "$createdAt"},
                },
            },
            //now grouping the item
            {
                $group: {
                    _id: "$month",
                    total: {$sum: 1}, // this will sum every register user
                }
            }
        ]);
        //sending data
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
