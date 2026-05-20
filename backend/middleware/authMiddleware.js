
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    console.log("AUTH HEADER:", req.headers.authorization);
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).send("Token missing");
    }
    const token = authHeader.split(" ")[1];
    console.log("TOKEN:", token);
    try {
        console.log("TOKEN RECEIVED:", token);
        const decode = jwt.verify(token, "secretkey");
        console.log("DECODE:", decode);
        req.user = decode;
        next();


    } catch (err) {
        console.log("JWT ERROR:", err.message);
        return res.status(403).send("Invalid token");
    }


}
module.exports = verifyToken;