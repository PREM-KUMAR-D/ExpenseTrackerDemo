
const Order = require('../models/order');
const User = require('../models/user');
const Expense = require('../models/expense');



exports.showLeaderBoard = async (req, res, next) => {
    try{
        const users =await User.findAll();
        const expenses = await Expense.findAll();
        const userAggregateExpenses ={};
        expenses.forEach(expense => {
            if(userAggregateExpenses[expense.id] ){

                userAggregateExpenses[expense.id] += expense.expense;
            }else{
                userAggregateExpenses[expense.id] = expense.expense;
            }
        });
        var userLeaderBoardDetails = [];
        users.forEach( (user)=>{
            userLeaderBoardDetails.push({
                name:user.name,
                total_cost : userAggregateExpenses[user.userId] || 0
            })
        });

        userLeaderBoardDetails.sort((a,b)=>{
            b.total_cost - a.total_cost;
        })

        res.status(200).json(userLeaderBoardDetails);

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}
