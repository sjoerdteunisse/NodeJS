const Game = require('../models/game.model');
const ApiError = require('../models/apierror.model');
const connectionPool = require('../config/mySql');

// 

var games = [
    //new Game('Battlefield 5', 'EA',2018, 'FPS')
];

module.exports = {

    getAll(req, res, next) {
        connectionPool.query("SELECT * FROM games", function (err, rows, fields) {
            if (err) {
                console.log(err);
                next(new ApiError('Failed to retrieve', 500));
            }

            var gameobjects = [];
            
            for (var i = 0; i < rows.length; i++) {
                gameobjects.push(new Game(rows[i].title, rows[i].producer, rows[i].year, rows[i].Type));
            }

            res.status(200).json(gameobjects).end();
        })
    },

    post(req, res, next) {
        console.log('post');

        if (req.body.name && req.body.producer && req.body.year && req.body.type) {
            const game = new Game(req.body.name, req.body.producer, req.body.year, req.body.type);

            connectionPool.query("INSERT INTO games ?, ?, ?, ?, ?, ?", function (err, rows, fields) {
                res.status(200).json(game).end();
            });

            //games.push(game);
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
        var game = games[id]

        if (id < 0 || id > games.length - 1) {
            next(new ApiError('Object not found', '404'))
        }
        else {
            if (req.body.constructor === Game && Game.keys(req.body).length === 0) {
                next(new ApiError('Replacing object failed', '500'));
            } else {
                if (req.body.name && req.body.producer && req.body.year && req.body.type) {
                    const game = new Game(req.body.name, req.body.producer, req.body.year, req.body.type);
                    games[id] = game;

                    res.status(200).json(game).end();
                }
                else {
                    next(new ApiError('Object invalid', '500'));
                }
            }
        }
    },

    getById(req, res, next) {
        console.log('getById');

        const id = req.params.id;

        connectionPool.query("SELECT * FROM games where id = ?", id, function (err, rows, fields) {
            if (err) {
                console.log(err);
                return next(new ApiError('Fatal error occured', 500));
            }

            if(rows.length == 0){
                return next(new ApiError('Id not found', 404));
            }
            
            var gameObject = new Game(rows[0].title, rows[0].producer, rows[0].year, rows[0].Type);

            res.status(200).json(gameObject).end();
        });
    },

    deleteById(req, res, next) {
        console.log('deleteById');

        const id = req.params.id;
        var game = games[id];

        if (game != undefined) {
            //splice(pos - amount to be removed)
            games.splice(id, 1);
            res.status(200).json({ message: 'Succesfully removed' });
        } else {

            next(new ApiError('Object not found', 404));
        }
    }
};