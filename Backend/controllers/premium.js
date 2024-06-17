
const Order = require('../models/order');
const User = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('../util/database');



exports.showLeaderBoard = async (req, res, next) => {
    try{
        const leaderboardOfUsers =await User.findAll({

            
            order:[[sequelize.literal('totalExpense'),'DESC']]
        });


        res.status(200).json(leaderboardOfUsers);

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}
