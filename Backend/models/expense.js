const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Expense = sequelize.define('expense',{
    id: { 
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    expense: Sequelize.BIGINT,
    description: Sequelize.TEXT,
    category: Sequelize.STRING
})

module.exports = Expense;