const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;


module.exports = (req,res,next) => {

    const JWTtoken = req.header('access-token')

    if(!JWTtoken){
        return res.status(401).json({message:'Unauthorised access'})
    }
    try {
        const JWTVerify = jwt.verify(JWTtoken,JWT_SECRET);
        req.user = JWTVerify.user
        next()
    } catch (error) {
        return res.status(401).json({message:'Unauthorised access'})
    }
}