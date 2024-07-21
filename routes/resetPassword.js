const express = require('express');

const resetPasswordController = require('../controllers/resetPassword');


const router = express.Router();

router.get('/update-password/:resetpasswordid', resetPasswordController.updatePassword)

router.get('/reset-password/:id', resetPasswordController.resetPassword)

router.use('/forgot-password', resetPasswordController.forgotPassword)

module.exports = router;