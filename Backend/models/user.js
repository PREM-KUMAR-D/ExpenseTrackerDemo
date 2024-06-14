const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('users',{
    email : {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    name: Sequelize.TEXT,
    password: Sequelize.TEXT

})


module.exports = User;
