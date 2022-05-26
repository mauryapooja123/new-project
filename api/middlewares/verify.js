const jwt = require("jsonwebtoken");
var auth = require("../settings/auth");

module.exports = (req,res,next) => {
    let token= req.headers.authorization;
    //console.log("token==",token)
    if (!token) return res.send({ status:401, auth: false, message: 'No token provided.' });

    jwt.verify(token, auth.jwtSecret, function(err, decoded) {
        if (err) 
        {
            return res.send({ status:401, auth: false, message: 'failed to authenticate you.' });
        }else{
            req.jwtUser = decoded;
            return next();
        }
        
  	});
}