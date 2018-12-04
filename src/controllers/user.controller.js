const User = require('../models/user.model');
const ApiError = require('../models/apierror.model');
const connectionPool = require('../config/mySql');

module.exports = {

    register(req, res, next) {

        console.log('Authcontroller.register called');

        if (req.body.email && req.body.password && req.body.firstname && req.body.lastname) {

            const sqlCreateUserQuery = "INSERT INTO users (email, password, firstname, lastname) VALUES ( ?, ?, ? )";

            connectionPool.query(sqlCreateUserQuery, [req.body.email, req.body.password, req.body.firstname, req.body.lastname], function (err, rows, fields) {
                if (err) {
                    console.dir(err);
                    return next(new ApiError(err.sqlMessage, 500));
                }

                res.status(200).json(user).end();
            });
        }
        else {
            return next(new ApiError('Posted object not correct!', 500));

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

            if (rows[0].email && rows[0].password == password) {
                res.status(200).json({ message: 'logged in' }).end();
            }
            else{
                return next(new ApiError('Authentication failed', 500));
            }

        });
    }
}