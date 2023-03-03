const { User } = require('./User');
const { Board } = require('./Board');
const { Cheese } = require('./Cheese');

Board.belongsTo(User);
User.hasMany(Board);

Cheese.belongsToMany(Board, { through: 'board_cheeses' });
Board.belongsToMany(Cheese, { through: 'board_cheeses' });

module.exports = {
	User,
	Board,
	Cheese,
};
