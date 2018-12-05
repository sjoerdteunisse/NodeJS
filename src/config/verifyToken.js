
const jwtConfig = require('./jwtConfig');
const jwt = require('jwt-simple');
const ApiError = require('../models/apierror.model');


function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    
    if (!token)
       return next(new ApiError('Authorization - No token provided.', '403'))

    console.log(token);

    let decoded = jwt.decode(token, jwtConfig.secret, true);

    console.log(decoded);

    //Given that this is a wrong approach.
    if (decoded.email) {
        req.userId = decoded.email;
        next();
    }
    else {
        //This shouldn't be a valid case. On Invalid Redirect?
        next(new ApiError('Authorization - No token provided.', '403'));
    }
}

module.exports = verifyToken;