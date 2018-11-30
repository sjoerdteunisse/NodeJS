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
    
        if(req.body.name != ''){

            const game = new Game(req.body.name, req.body.producer, req.body.year, req.body.type);
            games.push(game);

            res.status(200).json({message: 'Succesfully added'}).end();
        }
        else{
            res.status(404).json({message: 'Error adding'}).end();
        }
    },

    putById(req, res, next){
        console.log('put');

        const id = req.params.id;
        var game = games[id]
        
        if(game != null)
        {
            if(req.body.name != ''){
                const game = new Game(req.body.name, req.body.producer, req.body.year, req.body.type);
                games[id] = game;
    
                res.status(200).json({message: 'Succesfully replaced'}).end();
            }
            else{
                res.status(404).json({message: 'Error replacing'}).end();
            }
        }

    },

    getById(req, res, next){
        console.log('getById');
        const id = req.params.id;

        if(id < 0 || id > games.length-1){
                const error = new ApiError('Id not found', '404')

            next(error)
        }
        else{
            res.status(200).json(games[id]).end();
        }
    },

    deleteById(req, res, next){
        console.log('deleteById');

        //const store id.
        const id = req.params.id;
        //get object from memory
        var game = games[id];

        if(game != null)
        {
            games.splice(id, 1);
            res.status(200).json({message: 'Succesfully removed'});
        }else{
            res.status(404).json({error: "Object not found"}).end();
        }
    }
};
