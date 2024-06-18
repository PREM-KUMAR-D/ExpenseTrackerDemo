const express = require('express');
const userController = require('../controllers/user');
const expenseControlller = require('../controllers/expense');
const userAuth = require('../middleware/auth');

const router = express.Router();

router.post('/signup', userController.postAddUser);

router.post('/login', userAuth, userController.postLoginUser);

router.get('/download',userAuth,expenseControlller.downloadExpenses);


module.exports = router;