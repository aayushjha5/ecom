//creating express server
const express = require('express');
//connecting to mongoDB
const mongoose = require("mongoose");
//using env files for security
const dotenv = require('dotenv');

//writing configuration for dotenv
dotenv.config();

//using express
const app = express();

//for listening it at a port
var listener = app.listen(process.env.PORT || 6000, function () {
    console.log('Backend server is running on the port');
});


//connecting to mongoDB cloud server - ecom
mongoose.connect(process.env.MONGO_URL).then(
    // as this is a promise so controlling it
    () => console.log("Database connection successful!")
).catch(
    //if there is any error
    (err) => {
        console.log(err);
    }); 
