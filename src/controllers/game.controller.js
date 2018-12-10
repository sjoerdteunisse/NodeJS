const Game = require('../models/game.model');
const ApiError = require('../models/apierror.model');
const connectionPool = require('../config/mySql');


module.exports = {

    getAll(req, res, next) {
        console.log(`request made by ${req.userId}`);

        connectionPool.query("SELECT * FROM games", function (err, rows, fields) {
            if (err) {
                console.log(err);
                next(new ApiError('Failed to retrieve', 500));
            }

            var gameobjects = [];

            for (var i = 0; i < rows.length; i++) {
                gameobjects.push(new Game(rows[i].title, rows[i].producer, rows[i].year, rows[i].Type, rows[i].userId));
            }

            res.status(200).json(gameobjects).end();
        })
    },

    post(req, res, next) {
        console.log('post');
        console.log(req.userId);

        if (req.body.name && req.body.producer && req.body.year && req.body.type && req.userId) {
            const game = new Game(req.body.name, req.body.producer, req.body.year, req.body.type, req.userId);

            connectionPool.query("INSERT INTO games (title, producer, year, Type, userId) VALUES (?, ?, ?, ?, ?)", [game.name, game.producer, game.year, game.type, game.userId], function (err, rows, fields) {
                console.log('OnQueryExecuted');
                if (err) {
                    console.log(err);
                    return next(new ApiError('Failed to submit game', 500));
                }

                res.status(200).json(game).end();
            });
        }
        else {
            const err = new ApiError('Failed to add object', '500');
            console.log(err);
            next(err);
        }
    },

    putById(req, res, next) {
        console.log('put');

        const id = req.params.id;

        if (req.body.name && req.body.producer && req.body.year && req.body.type) {
            const game = new Game(req.body.name, req.body.producer, req.body.year, req.body.type, req.userId);

            connectionPool.query("SELECT * FROM games where ID = ?", [id], function (err, rows, fields) {
                if (rows[0].userId == game.userId) {
                    connectionPool.query("UPDATE games SET title = ?, producer = ?, year = ?, Type = ?  WHERE ID = ? AND userId = ?", [game.name, game.producer, game.year, game.type, id, game.userId], function (err, rows, fields) {
                        if (err) {
                            console.log(err);
                            return next(new ApiError('Fatal error occured', 500));
                        }

                        res.status(200).json(game).end();
                    });
                }
                else {
                    return next(new ApiError('You are not the rightfull owner, not allowed to modify.', 401));
                }
            });
        }
        else {
            const err = new ApiError('Object not found', 404);
            console.log(err);
            next(err);
        }

    },

    getById(req, res, next) {
        console.log('getById');

        const id = req.params.id;

        connectionPool.query("SELECT * FROM games where id = ?", [id], function (err, rows, fields) {
            if (err) {
                console.log(err);
                return next(new ApiError('Fatal error occured', 500));
            }

            if (rows.length == 0) {
                return next(new ApiError('Id not found', 404));
            }

            var gameObject = new Game(rows[0].title, rows[0].producer, rows[0].year, rows[0].Type);

            res.status(200).json(gameObject).end();
        });
    },

    deleteById(req, res, next) {
        console.log('deleteById');

        const id = req.params.id;

        if (!id) {
            return next(new ApiError('Object not found', 500));
        }

        connectionPool.query("SELECT * FROM games where ID = ?", [id], function (err, rows, fields) {
            if (rows[0].userId == req.userId) {
                connectionPool.query("DELETE FROM games where id = ?", [id], function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        return next(new ApiError('Fatal error occured', 500));
                    }

                    console.log('afected = ' + rows.affectedRows + ' res' + rows.affectedRows > 0);
                    if (rows.affectedRows > 0) {
                        res.status(200).json({ message: 'Succesfully removed' });
                    }
                    else {
                        return next(new ApiError('Object not found', 404));
                    }

                });
            }
            else{
                return next(new ApiError('You are not the rightfull owner, not allowed to modify.', 401));
            }
        });
    }
};