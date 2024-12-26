const jwt = require('jsonwebtoken')

module.exports = function (req,res,next) {
    if (req.method === "OPTIONS"){next()}
    const token = req.headers.authorization.split(' ')[1]
    if (!token){
        return res.status(401).json({message: "Not authorized"})
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.employee = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "Incorrect token"})
    }
}