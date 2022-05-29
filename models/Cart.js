//connecting to mongoDB
const mongoose = require('mongoose');

//creating user schema
const CartSchema = new mongoose.Schema(
    //creating object
    {
        //properties
        userId: { type: String, required: true },
        products: [
            {
                productId: {
                    type: String
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
    }, { timestamps: true } //creates createdAt and updatedAt field
);

module.exports = mongoose.model("Cart", CartSchema);