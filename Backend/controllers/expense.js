const { where } = require('sequelize');
const Expense = require('../models/expense');

const uuid = require('uuid');

exports.getExpenses = (req,res,next)=>{


    const userId = req.user.userId;

    Expense.findAll({
        where:{
            userUserId: userId
        }
    })
    .then(expense =>{
        
        res.status(200).json(expense);
    })
    .catch(err => console.log(err));

}


exports.addExpense = (req,res,next)=>{
    
    const expense = req.body.expense;
    const description = req.body.description;
    const category = req.body.category;
    
    const userId = req.user.userId;

    const data = Expense.create({expense:expense,description:description,category:category , userUserId:userId})
    .catch( err => console.log(err));

    res.status(201).json({
        message:"success",
        success: true
    });
}

exports.deleteExpense =(req,res,next)=>{
    
    const id = req.params.id;
    const userId = req.user.userId;
    Expense.findByPk(id , {
        where: {
            userUserId : userId
        }
    })
    .then( expense =>{
        expense.destroy()
    })
    .catch((err)=> console.log('failed to destroy : ',err))




}