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
		let newUser = await User.create({
			name: 'Aaron',
			email: 'aaron@gmail.com',
		});
		expect(newUser.dataValues.name).toBe('Aaron');
		expect(newUser.dataValues.email).toBe('aaron@gmail.com');
	});

	it('should create a new board', async () => {
		let newBoard = await Board.create({
			type: 'Chess',
			description: 'A Chess Board',
			rating: 900,
		});
		expect(newBoard.dataValues.type).toBe('Chess');
		expect(newBoard.dataValues.description).toBe('A Chess Board');
		expect(newBoard.dataValues.rating).toBe(900);
	});

	it('should create a new cheese', async () => {
		let newCheese = await Cheese.create({
			title: 'Cheddar',
			description: 'Amazing Cheesy flavor loved by all',
		});
		expect(newCheese.dataValues.title).toBe('Cheddar');
		expect(newCheese.dataValues.description).toBe(
			'Amazing Cheesy flavor loved by all'
		);
	});
});

describe('One To Many and Many To Many Associations', () => {
	beforeEach(async () => {
		// the 'sync' method will create tables based on the model class
		// by setting 'force:true' the tables are recreated each time the
		// test suite is run
		await sequelize.sync({ force: true });
	});

	it('user and boards associatiate properly', async () => {
		let newUser = await User.create({
			name: 'Aaron',
			email: 'aaron@gmail.com',
		});
		let newBoard = await Board.create({
			type: 'Chess',
			description: 'A Chess Board',
			rating: 900,
		});
		await newUser.addBoard(newBoard.dataValues.id);
		let data = await Board.findAll({
			include: [{ model: User }],
		});
		expect(data[0].dataValues.user.dataValues.name).toBe('Aaron');
		expect(data[0].dataValues.user.dataValues.email).toBe(
			'aaron@gmail.com'
		);
	});

	it('boards and cheeses associate properly', async () => {
		let newBoard = await Board.create({
			type: 'Chess',
			description: 'A Chess Board',
			rating: 900,
		});
		let newCheese = await Cheese.create({
			title: 'Cheddar',
			description: 'Amazing Cheesy flavor loved by all',
		});
		await newBoard.addCheese(newCheese.dataValues.id);
		let data = await Board.findAll({
			include: [{ model: Cheese }],
		});
		let data2 = await Cheese.findAll({
			include: [{ model: Board }],
		});

		expect(data[0].dataValues.cheeses.length).toBe(1);
		expect(data2[0].dataValues.boards[0].dataValues.type).toBe('Chess');
		expect(data2[0].dataValues.boards[0].dataValues.description).toBe(
			'A Chess Board'
		);
		expect(data2[0].dataValues.boards[0].dataValues.rating).toBe(900);
	});
});
