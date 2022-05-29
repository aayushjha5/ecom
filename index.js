//creating express server
const express = require('express');
//connecting to mongoDB
const mongoose = require("mongoose");
//using env files for security
const dotenv = require('dotenv');
//importing routers
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');





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

//for passing json file
app.use(express.json());

//using userRoute
app.use('/api/users', userRoute);

//using authRoute
app.use('/api/auth', authRoute);

//using productRoute
app.use('/api/products', productRoute);

//using cartRoute
app.use('/api/carts', cartRoute);

//using orderRoute
app.use('/api/orders', orderRoute);