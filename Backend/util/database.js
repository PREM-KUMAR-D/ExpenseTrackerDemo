const Sequelize = require('sequelize');

const pass = process.env.DB_PASSWORD;
const user = process.env.DB_USER;
const sequelize = new Sequelize('expense-demo',user,pass,{
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST
});

module.exports = sequelize;