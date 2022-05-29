//connecting to mongoDB
const mongoose = require('mongoose');

//creating user schema
const OrderSchema = new mongoose.Schema(
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
        amount: {
            type: Number,
            required: true,
        },
        address:{
            type: Object,
            required: true   // object used here as after payment stripe library returns object and we can take info from it.
        },
        status: {
            type: String,
            default: 'pending',
        },
    }, { timestamps: true } //creates createdAt and updatedAt field
);

module.exports = mongoose.model("Order", OrderSchema);