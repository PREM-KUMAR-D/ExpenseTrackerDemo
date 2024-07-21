const express = require('express');


const userAuth = require('../middleware/auth');
const purchaseController = require('../controllers/purchase');


const router = express.Router();

router.get('/premium-membership', userAuth, purchaseController.purchasePremium);

router.post('/update-transaction-status', userAuth, purchaseController.updateTransactionStatus);


module.exports = router;