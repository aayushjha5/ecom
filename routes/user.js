//using router function of express js
const router = require('express').Router();

//req - getting request from user ex- username pswd email etc. or can be empty
//res - after func, sending response to it
router.get("/usergettest", (req,res)=>{
res.send('user get test is successful');
});

router.post('/userposttest', (req,res)=>{
    //taking user input
    const username = req.body.username;
    console.log(username);
})

module.exports = router
