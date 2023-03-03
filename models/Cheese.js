const { sequelize, Sequelize } = require('../db');

const Cheese = sequelize.define('cheeses', {
	title: Sequelize.STRING,
	description: Sequelize.STRING,
});

module.exports = { Cheese };
