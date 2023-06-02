const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');


const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(StatusCodes.UNAUTHORIZED).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.Token_Secret);
        req.user = verified;
        next();
    } catch(err){
        res.status(StatusCodes.BAD_REQUEST).send('Invalid Token');
    }
}

module.exports = verifyToken;