const express= require('express');


const userAuth = require('../middleware/auth');
const premiumController = require('../controllers/premium');



const router = express.Router();

router.get('/show-leader-board',userAuth , premiumController.showLeaderBoard);




module.exports = router;