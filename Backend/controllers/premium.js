
const Order = require('../models/order');
const User = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('../util/database');



exports.showLeaderBoard = async (req, res, next) => {
    try{
        const leaderboardOfUsers =await User.findAll({
            attributes: ['userId','name' ,[sequelize.fn('sum',sequelize.col('expenses.expense')),'total_cost']],
            include: [
                {
                    model: Expense,
                    attributes: []
                }
            ],
            group:['users.userId'],
            order:[[sequelize.literal('total_cost'),'DESC']]
        });


        res.status(200).json(leaderboardOfUsers);

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}
