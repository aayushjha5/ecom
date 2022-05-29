//connecting to mongoDB
const mongoose = require('mongoose');

//creating user schema
const ProductSchema = new mongoose.Schema(
    //creating object
    {
        //properties
        title: { type: String, required: true, unique: true },
        desc: { type: String, required: true },
        img: { type: String, required: true },
        categories: { type: Array }, // to make array of categories
        size: { type: String },
        color: { type: String },
        price: { type: Number, required: true },
    }, { timestamps: true } //creates createdAt and updatedAt field
);

module.exports = mongoose.model("Product", ProductSchema);