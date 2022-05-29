//using router
const router = require("express").Router();
//using stripe
const stripe = require("stripe")(process.env.STRIPE_KEY);

//endpoint
router.post("/payment", (req, res) => {
    //charging a client
    //when user do payment, we get a token id
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "inr",
        },
        (stripeErr, stripeRes) =>
         {
             if(stripeErr){
                 res.status(500).json(stripeErr);
             }else{
                 res.status(200).json(stripeRes);
             }
         },
    );
});


module.exports = router;