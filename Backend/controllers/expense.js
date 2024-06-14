const Expense = require('../models/expense');

const uuid = require('uuid');

exports.getExpenses = (req,res,next)=>{
    Expense.findAll()
    .then(expense =>{
        
        res.status(200).json(expense);
    })
    .catch(err => console.log(err));

}


exports.addExpense = (req,res,next)=>{
    
    const expense = req.body.expense;
    const description = req.body.description;
    const category = req.body.category;
    const id = uuid.v4();

    const data = Expense.create({id: id,expense:expense,description:description,category:category});

    res.status(201).json(id);
}

exports.deleteExpense =(req,res,next)=>{
    
    const id = req.params.id;
    Expense.findByPk(id)
    .then( expense =>{
        expense.destroy()
    })
    .catch((err)=> console.log('failed to destroy : ',err))




}