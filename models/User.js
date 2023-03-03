const { sequelize, Sequelize } = require('../db');

const User = sequelize.define('users', {
	name: Sequelize.STRING,
	email: Sequelize.STRING,
});

module.exports = { User };
