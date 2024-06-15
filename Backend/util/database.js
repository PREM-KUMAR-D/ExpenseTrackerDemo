const Sequelize = require('sequelize');

const pass = process.env.DB_PASSWORD;
const user = process.env.DB_USER;
const dialect =process.env.DB_DIALECT;
const host = process.env.DB_HOST;
const sequelize = new Sequelize('expense-demo',user,pass,{
    dialect: dialect,
    host: host
});

module.exports = sequelize;