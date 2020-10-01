const LootTable = require('loot-table');
module.exports = {
	common() {
		// cost 50
		const loot = new LootTable();
		loot.add({ name: 'Scooter', amount: [2, 3] }, 25);
		loot.add({ name: 'Car', amount: [1, 1] }, 20);
		loot.add({ name: 'Motorcycle', amount: [1, 2] }, 25);
		loot.add({ name: 'Profile Colour', amount: [1, 2] }, 20);
		loot.add({ name: 'Sailboat', amount: [1, 1] }, 5);
		loot.add({ name: 'Motorboat', amount: [1, 1] }, 5);
		return loot.choose();
	},

	rare() {
		// cost 300
		const loot = new LootTable();
		loot.add({ name: 'Motorcycle', amount: [6, 3] }, 21);
		loot.add({ name: 'Car', amount: [3, 1] }, 21);
		loot.add({ name: 'Sailboat', amount: [1, 0] }, 15);
		loot.add({ name: 'Sailboat', amount: [1, 0] }, 5);
		loot.add({ name: 'Motorboat', amount: [2, 1] }, 21);
		loot.add({ name: 'Prop plane', amount: [1, 0] }, 5);
		loot.add({ name: 'Prop plane', amount: [2, 0] }, 5);
		loot.add({ name: 'Ship', amount: [1, 0] }, 3);
		loot.add({ name: 'Jet plane', amount: [1, 0] }, 1);
		loot.add({ name: 'Steal Protection', amount: [1, 0] }, 6);
		return loot.choose();
	},

	epic() {
		// cost 1400
		const loot = new LootTable();
		loot.add({ name: 'Sailboat', amount: [5, 4] }, 10);
		loot.add({ name: 'Training Sword', amount: [3, 1] }, 8);
		loot.add({ name: 'Training Staff', amount: [3, 1] }, 7);
		loot.add({ name: 'Gun', amount: [2, 1] }, 7);
		loot.add({ name: 'Motorboat', amount: [8, 3] }, 10);
		loot.add({ name: 'Ship', amount: [2, 1] }, 10);
		loot.add({ name: 'Jet Plane', amount: [2, 1] }, 15);
		loot.add({ name: 'Prop Plane', amount: [3, 3] }, 10);
		loot.add({ name: 'House', amount: [1, 1] }, 10);
		loot.add({ name: 'Steal Protection', amount: [2, 1] }, 8);
		loot.add({ name: 'Museum', amount: [1, 0] }, 5);
		loot.add({ name: 'Star', amount: [1, 0] }, 2);
		loot.add({ name: 'Office', amount: [1, 0] }, 0.9);
		loot.add({ name: 'Stadium', amount: [1, 0] }, 0.1);
		return loot.choose();
	},

	legendary() {
		// cost 8000
		const loot = new LootTable();
		loot.add({ name: 'Jet Plane', amount: [9, 3] }, 25);
		loot.add({ name: 'House', amount: [7, 4] }, 25);
		loot.add({ name: 'Museum', amount: [1, 1] }, 15);
		loot.add({ name: 'Museum', amount: [2, 0] }, 10);
		loot.add({ name: 'Star', amount: [1, 0] }, 16);
		loot.add({ name: 'Star', amount: [2, 0] }, 5);
		loot.add({ name: 'Office', amount: [1, 0] }, 3);
		loot.add({ name: 'Stadium', amount: [1, 0] }, 1);
		return loot.choose();
	},

};