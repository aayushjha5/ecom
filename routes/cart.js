//importing verifyToken function
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const Cart = require("../models/Cart");

//using router function of express js
const router = require('express').Router();

//CREATE an save a cart 
router.post("/",verifyToken, async (req,res)=>{
    const newCart =  new Cart(req.body);
     
    //save the cart and send response
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json(error);
    }
});

// UPDATE Cart (only admin)
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    //now update the cart
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                //give new info to user 
                $set: req.body
            },
            { new: true }
        );

        //send updatedCart details to admin
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json(error);
    }
});

//DELETE Cart (only admin)
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) =>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart Deleted!");
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET user Cart  
router.get("/find/:userId",verifyTokenAndAuthorization, async (req, res) =>{
    try {
       const cart = await Cart.findOne({userId: req.params.userId});
       res.status(200).json({cart});
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET all
router.get("/", verifyTokenAndAdmin, async (req,res)=>{
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
