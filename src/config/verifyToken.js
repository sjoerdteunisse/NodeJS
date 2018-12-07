
const jwtConfig = require('./jwtConfig');
const jwt = require('jwt-simple');

var jwtAsync = require('jsonwebtoken');
const ApiError = require('../models/apierror.model');


function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    
    if (!token)
       return next(new ApiError('Authorization - No token provided.', '401'))

    console.log(token);


    jwtAsync.verify(token, jwtConfig.secret, function(err, decoded) {
   
        if (decoded.email) {
            req.userId = decoded.email;
            next();
        }
        else {
            //This shouldn't be a valid case. On Invalid Redirect?
            next(new ApiError('Authorization - No token provided.', '401'));
        }

    });
}

module.exports = verifyToken;