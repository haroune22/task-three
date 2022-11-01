const jwt =require("jsonwebtoken");

const checklogin = (req,res,next)=>{
    const token = req.body.token || req.query.token || req.headers["y-access-token"];
    if(!token){
        return res.status(403).send("a token is required for athentification")
    }
    try {
        const decoded = jwt.verify(token,process.env.token_key)
        req.user = decoded;
    } catch (err) {
        res.status(401).send("invaid token")
    }
    return next();
}

module.exports = checklogin;