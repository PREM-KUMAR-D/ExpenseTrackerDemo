const uuid = require('uuid');

const Expense = require('../models/expense');
const User = require('../models/user');
const sequelize = require('../util/database');


exports.getExpenses = async (req, res, next) => {


    const userId = req.user.userId;

    try {

        const expense = await Expense.findAll({ where: { userUserId: userId } });
        res.status(200).json(expense);
    } catch (err) {

        console.log(err);
        return res.status(500).json({
            message: "failure",
            success: false
        });

    }





}


exports.addExpense = async (req, res, next) => {

    const t = await sequelize.transaction();
    
    try {
        
        const expense = req.body.expense;
        const description = req.body.description;
        const category = req.body.category;
    
        const userId = req.user.userId;
        const expenseRow = await Expense.create({ expense: expense, description: description, category: category, userUserId: userId }, { transaction: t });

        const totalExpense = Number(req.user.totalExpense) + Number(req.body.expense);

        await User.update({ totalExpense: totalExpense }, { where: { userId: req.user.userId } ,  transaction: t  });

        await t.commit();
        return res.status(201).json({ message: "success", success: true });

    }
    catch (err) {
        await t.rollback();

        return res.status(500).json({
            message: "failure",
            success: false
        });
    }



}

exports.deleteExpense = async (req, res, next) => {

    const id = req.params.id;
    const userId = req.user.userId;
    if (id === undefined || id.length === 0) {
        return res.status(400).json({ success: false });
    }

    try {
        const expense = await Expense.findByPk(id, { where: { userUserId: userId } });
        if (expense === null) {
            return res.status(404).json({ success: false, message: 'Expense does not belong to the user' });
        }
        expense.destroy()
        return res.status(200).json({ success: true, message: 'Deleted Succesfully' });

    } catch (err) {

        console.log('failed to destroy : ', err);
        return res.status(500).json({ success: false, message: 'Failed' });
    }

}