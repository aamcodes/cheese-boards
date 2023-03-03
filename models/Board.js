const { sequelize, Sequelize } = require('../db');

const Board = sequelize.define('boards', {
	type: Sequelize.STRING,
	description: Sequelize.STRING,
	rating: Sequelize.INTEGER,
});

module.exports = { Board };
