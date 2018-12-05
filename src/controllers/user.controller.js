const User = require('../models/user.model');
const ApiError = require('../models/apierror.model');
const connectionPool = require('../config/mySql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {

    register(req, res, next) {

        console.log('Authcontroller.register called');


        if (req.body.email && req.body.password && req.body.firstname && req.body.lastname) {
            const sqlCreateUserQuery = "INSERT INTO users (email, password, firstname, lastname) VALUES ( ?, ?, ?, ? )";

            bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                connectionPool.query(sqlCreateUserQuery, [req.body.email, hash, req.body.firstname, req.body.lastname], (err, rows, fields) => {
                    if (err) {
                        console.dir(err);
                        return next(new ApiError(err.sqlMessage, 500));
                    }

                    bcrypt.compare(req.body.password, hash, (err, result) => {
                        if (err) { throw (err); }
                        res.status(200).json({ hashResul: result, fm: req.body.email, firstname: req.body.firstname, lastName: req.body.lastname }).end();
                    });
                });
            });
        }
        else {
            return next(new ApiError('Posted object not correct!' , 500));
        }
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