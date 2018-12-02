const Game = require('../models/game.model');
const ApiError = require('../models/apierror.model');


var games = [
    new Game('Battlefield 5', 'EA',2018, 'FPS')
];

module.exports = {
    
    getAll(req, res){
        console.log('getAll');

        res.status(200).json(games).end();
    },

    post(req, res){
        console.log('post');
    
        //Basic post check if properties are not string.empty||.
        if(req.body.name != '' && req.body.producer != '' && req.body.producer != '' && req.body.type != ''){
            
            const game = new Game(req.body.name, req.body.producer, req.body.year, req.body.type);
            games.push(game);
            res.status(200).json(game).end();
        }
        else{
            next(new ApiError('Failed to add object', '500'))
        }
    },

    putById(req, res, next){
        console.log('put');

        const id = req.params.id;
        var game = games[id]
        
        if(id < 0 || id > games.length-1){
            next(new ApiError('Object not found', '404'))
        }
        else
        {
            if(req.body.name != '' && req.body.producer != '' && req.body.producer != '' && req.body.type != ''){
                const game = new Game(req.body.name, req.body.producer, req.body.year, req.body.type);
                games[id] = game;
    
                res.status(200).json(game).end();
            }
            else{
                next(new ApiError('Replacing object failed', '500'))
            }
        }

    },

    getById(req, res, next){
        console.log('getById');

        const id = req.params.id;

        if(id < 0 || id > games.length - 1){
            next(new ApiError('Id not found', '404'))
        }
        else{
            res.status(200).json(games[id]).end();
        }
    },

    deleteById(req, res, next){
        console.log('deleteById');

        const id = req.params.id;
        var game = games[id];

        if(game != null)
        {
            //splice(pos - amount to be removed)
            games.splice(id, 1);
            res.status(200).json({message: 'Succesfully removed'});
        }else{
            res.status(404).json({error: "Object not found"}).end();
        }
    }
};
