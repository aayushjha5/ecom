//connecting to mongoDB
const mongoose = require('mongoose');

//creating user schema
const UserSchema = new mongoose.Schema(
    //creating object
    {
        //properties
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
    }, { timestamps: true } //creates createdAt and updatedAt field
);

module.exports = mongoose.model("User", UserSchema);