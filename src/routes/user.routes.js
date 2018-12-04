const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.post('/user/signup', userController.register);
router.get('/user/login', userController.login);


module.exports = router;