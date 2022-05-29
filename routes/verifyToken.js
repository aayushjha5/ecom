// import jwt
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    //checking authHeader; sending token with passphrase ; getting either error or user detail
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            //if error found
            if (err) return res.status(403).json("Invalid Access Token");
            //if everything ok, then
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        //verify whether this token is of end-user or is of Admin
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("Access Denied!");
        }
    });
};

//for admin (ex- for managing order)
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        //verify whether this token is of end-user or is of Admin
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("Access Denied!");
        }
    });
};

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};