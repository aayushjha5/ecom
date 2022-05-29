//importing verifyToken function
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const Order = require("../models/Order");

//using router function of express js
const router = require('express').Router();

//CREATE an save a order 
router.post("/",verifyToken, async (req,res)=>{
    const newOrder =  new Order(req.body);
     
    //save the order and send response
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
});

// UPDATE Order (only admin)
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    //now update the order
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                //give new info to user 
                $set: req.body
            },
            { new: true }
        );

        //send updatedOrder details to admin
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
});

//DELETE Order (only admin)
router.delete("/:id", verifyTokenAndAdmin, async (req, res) =>{
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order Deleted!");
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET user Orders  
router.get("/find/:userId",verifyTokenAndAuthorization, async (req, res) =>{
    try {
       const orders = await Order.find({userId: req.params.userId});
       res.status(200).json({orders});
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET all orders (by admin)
router.get("/", verifyTokenAndAdmin, async (req,res)=>{
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET monthly income
router.get("/income", verifyTokenAndAdmin, async (req,res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
              $project: {
                month: { $month: "$createdAt" },
                sales: "$amount",
              },
            },
            {
              $group: {
                _id: "$month",
                total: { $sum: "$sales" },
              },
            },
          ]);
          res.status(200).json(income);
    } catch (error) {
        res.status(500).json(error);
    }

});

module.exports = router;
