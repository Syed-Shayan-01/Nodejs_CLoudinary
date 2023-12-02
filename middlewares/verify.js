const jwt = require("jsonwebtoken");
const { Secret } = require("../Secret/Key");

const verifyToken = (req, res, next) => {

    const { authorization } = req.headers;
    const token = authorization && authorization.split(" ")[1];
    jwt.verify(token, Secret, (err, decoded) => {
        if (err) {
            return res.status(401).send("err --->", err);
        }
        return next();
    });
}


module.exports = verifyToken;