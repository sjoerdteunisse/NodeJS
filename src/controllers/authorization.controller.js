const bcrypt = require('bcrypt');
const jwtConfig = require('../config/jwtConfig');
var Jwt = require('jwt-simple');

const ApiError = require('../models/apierror.model');
const connectionPool = require('../config/mySql');


const saltRounds = 10;

module.exports = {
    
    register(req, res, next) {
        console.log('Authcontroller.register called');

        if (req.body.email && req.body.password && req.body.firstname && req.body.lastname) {
            const sqlCreateUserQuery = "INSERT INTO users (email, password, firstname, lastname) VALUES ( ?, ?, ?, ? )";
            
            //Run hash alogirthm based on pushed raw password and the amount of salt rounds.
            //Where hashDetection of cycles = $X$^y$ and X = 2 the hashround ^ 10
            bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                connectionPool.query(sqlCreateUserQuery, [req.body.email, hash, req.body.firstname, req.body.lastname], (err, rows, fields) => {
                    if (err) {
                        console.dir(err);
                        return next(new ApiError(err.sqlMessage, 500));
                    }

                    //Done to check if we actually are able to authenticate. -Debug purpose.
                    bcrypt.compare(req.body.password, hash, (err, result) => {
                        if (err) {
                            return next(new ApiError(err, 500)); 
                        }

                        const userObj = { hashResult: result, email: req.body.email, firstname: req.body.firstname, lastName: req.body.lastname };
                        const authRes = Jwt.encode(userObj, jwtConfig.secret);

                        res.set('x-access-token', authRes);
                        res.status(200).send({ auth: true, token: authRes });
                    });
                });
            });
        }
        else {
            return next(new ApiError('Posted object not correct!' , 500));
        }
    },
    me(req, res, next){
        console.log('Authcontroller.me called');

        //Get from header.
        var token = req.headers['x-access-token'];
        if (!token) // Return on no token.
            return res.status(401).send({ auth: false, message: 'No token provided.' });

    
        //Decode token
        var decoded = Jwt.decode(token, jwtConfig.secret, false, 'HS256');
        res.status(200).send(decoded);

    },
    login(req, res, next) {
        console.log('Authcontroller.login called');

        var email = req.body.email;
        var password = req.body.password;

        const sqlQueryByEmail = "SELECT * FROM users WHERE email = ?";

        connectionPool.query(sqlQueryByEmail, [email], function (err, rows, fields) {
            if (err) {
                console.dir(err);
                return next(new ApiError(err.sqlMessage, 500));
            }

            bcrypt.compare(password, rows[0].password, (err, compareResult) => {
                if (compareResult) {
                    res.status(200).json({ message: 'Logged in succesfully' }).end();
                }
                else {
                    return next(new ApiError('Authentication failed', 500));
                }
            });
        });
    }
}