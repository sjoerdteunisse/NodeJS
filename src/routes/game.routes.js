
const router = require('express').Router();
const gameController = require('../controllers/game.controller');

router.get('/games',gameController.getAll);
router.post('/games', gameController.post);

router.put('/games/:id', gameController.putById)
router.get('/games/:id', gameController.getById);
router.delete('/games/:id', gameController.deleteById);

module.exports = router;