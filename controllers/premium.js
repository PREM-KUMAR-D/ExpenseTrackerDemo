
const User = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('sequelize');





exports.showLeaderBoard = async (req, res, next) => {
    try {
        const leaderboardOfUsers = await User.find({})
            .sort({ totalExpense: -1 })
            .limit(5);

        res.status(200).json(leaderboardOfUsers);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
