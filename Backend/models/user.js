const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('users', {
    userId: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    name: Sequelize.TEXT,
    password: Sequelize.TEXT,
    isPremium: Sequelize.BOOLEAN,
    totalExpense: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }

})


module.exports = User;
