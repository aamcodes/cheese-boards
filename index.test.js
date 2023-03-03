const { sequelize } = require('./db');
const { User, Board, Cheese } = require('./models/index');

describe('User, Board, Cheese Models', () => {
	beforeEach(async () => {
		// the 'sync' method will create tables based on the model class
		// by setting 'force:true' the tables are recreated each time the
		// test suite is run
		await sequelize.sync({ force: true });
	});

	it('should create a new user', async () => {
		let newUser = await new User({
			name: 'Aaron',
			email: 'aaron@gmail.com',
		});
		expect(newUser.dataValues.name).toBe('Aaron');
		expect(newUser.dataValues.email).toBe('aaron@gmail.com');
	});

	it('should create a new board', async () => {
		let newBoard = await new Board({
			type: 'Chess',
			description: 'A Chess Board',
			rating: 900,
		});
		expect(newBoard.dataValues.type).toBe('Chess');
		expect(newBoard.dataValues.description).toBe('A Chess Board');
		expect(newBoard.dataValues.rating).toBe(900);
	});

	it('should create a new cheese', async () => {
		let newCheese = await new Cheese({
			title: 'Cheddar',
			description: 'Amazing Cheesy flavor loved by all',
		});
		expect(newCheese.dataValues.title).toBe('Cheddar');
		expect(newCheese.dataValues.description).toBe(
			'Amazing Cheesy flavor loved by all'
		);
	});
});
