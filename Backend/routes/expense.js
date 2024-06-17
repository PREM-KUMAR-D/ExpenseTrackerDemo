const express = require('express');
const expenseController = require('../controllers/expense');
const userAuth = require('../middleware/auth');



const router = express.Router();



router.get('/get-expenses', userAuth, expenseController.getExpenses);

router.post('/add-expense', userAuth, expenseController.addExpense);

router.delete('/delete/:id', userAuth, expenseController.deleteExpense);




module.exports = router;