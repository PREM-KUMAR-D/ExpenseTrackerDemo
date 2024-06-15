const express = require('express');
const userController = require('../controllers/user');
const userAuth = require('../middleware/auth');

const router = express.Router();

router.post('/signup',userController.postAddUser);

router.post('/login',userAuth,userController.postLoginUser);


module.exports = router;