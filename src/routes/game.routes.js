
const router = require('express').Router();
const gameController = require('../controllers/game.controller');
const VerifyToken = require('../config/verifyToken');

router.get('/games', VerifyToken , gameController.getAll);
router.post('/games', VerifyToken , gameController.post);
router.put('/games/:id',VerifyToken, gameController.putById)
router.get('/games/:id', VerifyToken, gameController.getById);
router.delete('/games/:id', VerifyToken , gameController.deleteById);

module.exports = router;