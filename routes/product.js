//importing verifyToken function
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const Product = require("../models/Product");

//using router function of express js
const router = require('express').Router();

//CREATE an save a product (only admin)
router.post("/",verifyTokenAndAdmin, async (req,res)=>{
    const newProduct =  new Product(req.body);
     
    //save the product and send response
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});

// UPDATE product (only admin)
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    //now update the product
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                //give new info to user 
                $set: req.body
            },
            { new: true }
        );

        //send updatedProduct details to admin
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});

//DELETE product (only admin)
router.delete("/:id", verifyTokenAndAdmin, async (req, res) =>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product Deleted!");
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET product  
router.get("/find/:id", async (req, res) =>{
    try {
       const product = await Product.findById(req.params.id);
       res.status(200).json({product});
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET all products 
router.get("/",  async (req, res) =>{
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;

        if(qNew){
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        }
        else if(qCategory){
            products = await Product.find({categories:{
                $in: [qCategory],
            }
        });
        } 
        else {
            products = await Product.find();
        }
       res.status(200).json({products});
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
