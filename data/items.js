/* eslint-disable no-multiple-empty-lines */
/* eslint-disable space-before-function-paren */
module.exports = {


	// CHESTS
	'common chest': {
		name: 'Common Chest',
		value: 600,
		buyable: true,
		emoji: '<:chest_t_01:745278856201633832>',
		rarity: 'common',
		picture: 'common_closed.png',
		ctg: 'chest',
		description: 'Common Chest.',
	},
	'rare chest': {
		name: 'Rare Chest',
		value: 3500,
		buyable: true,
		emoji: '<:chest_t_02:745278856298102864>',
		rarity: 'rare',
		picture: 'rare_closed.png',
		ctg: 'chest',
		description: 'Rare Chest.',
	},
	'epic chest': {
		name: 'Epic Chest',
		value: 14000,
		buyable: true,
		emoji: '<:chest_t_03:745278856268742696>',
		rarity: 'epic',
		picture: 'epic_closed.png',
		ctg: 'chest',
		description: 'Epic Chest.',
	},
	'legendary chest': {
		name: 'Legendary Chest',
		value: 130000,
		buyable: true,
		emoji: '<:chest_t_04:745278855987593226>',
		rarity: 'legendary',
		picture: 'legendary_closed.png',
		ctg: 'chest',
		description: 'Legendary Chest.',
	},
	'mystery chest': {
		name: 'Mystery Chest',
		value: 5000,
		buyable: true,
		emoji: '<:chest_t_02:745278856298102864>',
		rarity: 'rare',
		picture: 'mystery_open.png',
		ctg: 'chest',
		description: 'A mystery chest that can contain really bad loot or really good loot.',
	},

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// CONSUMABLES
	'protection': {
		name: 'Protection',
		value: 6000,
		buyable: true,
		emoji: '🛡️',
		rarity: 'epic',
		picture: null,
		ctg: 'consumable',
		description: 'You can use this to gain 8 hours of protection against attacks. If you use any of the money commands your protection will be reset\nThis item stacks.',
		use: async function (profile, sentMessage, amount, embed, item, msgUser) {
			const protection = await profile.addProtection(msgUser.user_id, amount * 8);
			return { succes: true, message: `You have activated your protection.\nIt will last untill __${protection}__` };
		},
	},
	'profile colour': {
		name: 'Profile Colour',
		value: 400,
		buyable: true,
		emoji: '🌈',
		rarity: 'uncommon',
		picture: null,
		ctg: 'consumable',
		description: 'Use this to alter the white border on the left of all your commands.',
		use: function (profile, sentMessage, amount, embed, item, msgUser) {
			const filter = m => m.author.id === msgUser.user_id;
			sentMessage.edit(embed.setDescription('Specify the colour you want for your profile in the format **#0099ff**\n[hex colour picker](https://www.color-hex.com/)')).then(() => {
				sentMessage.channel.awaitMessages(filter, { max: 1, time: 60000 })
					.then(collected => {
						const colour = collected.first().content;
						try {
							profile.setPColour(msgUser.user_id, colour);
						}
						catch { return sentMessage.edit(embed.setDescription('Thats not a valid Hex code')); }
						profile.removeItem(msgUser.user_id, item, amount);
						return sentMessage.edit(embed.setDescription(`Profile colour succesfully changed to colour **${colour}**`));
					});
			});
		},
	},

	'healing potion': {
		name: 'Healing Potion',
		value: 2600,
		buyable: true,
		emoji: '<:healing_potion:764111086818557963>',
		rarity: 'uncommon',
		picture: 'hp.png',
		ctg: 'consumable',
		description: 'Restores 50 HP',
		use: async function (profile, sentMessage, amount, embed, item, msgUser) {
			const nextHeal = await profile.getHeal(msgUser.user_id);
			if (nextHeal === true) {

				const heal = await profile.changeHp(msgUser.user_id, 50);

				if (heal) {
					profile.setHeal(msgUser.user_id);
					return { succes: true, message: `You healed **${heal}**<:health:730849477765890130>.\nCurrent <:health:730849477765890130> is **${await profile.getHp(msgUser.user_id)}/${1000}<:health:730849477765890130>**.` };
				}
				else return { succes: false, message: 'You are already at max health' };
			}
			else return { succes: false, message: `Your healing is on cooldown, next heal at ${nextHeal}` };
		},
	},





























	// COLLECTABLES
	'star': {
		name: 'Star',
		value: 100000,
		buyable: true,
		emoji: '⭐',
		rarity: 'legendary',
		picture: null,
		ctg: 'collectable',
		description: 'Gives you passive income.',
	},
	'museum': {
		name: 'Museum',
		value: 50000,
		buyable: true,
		emoji: '🏛️',
		rarity: 'epic',
		picture: null,
		ctg: 'collectable',
		description: 'Gives you passive income.',
	},
	'house': {
		name: 'House',
		value: 10000,
		buyable: true,
		emoji: '🏡',
		rarity: 'epic',
		picture: null,
		ctg: 'collectable',
		description: 'Gives you passive income.',
	},
	'car': {
		name: 'Car',
		value: 650,
		buyable: false,
		emoji: '🚗',
		rarity: 'common',
		picture: null,
		ctg: 'collectable',
		description: 'Gives you passive income.',
	},
	'motorcycle': {
		name: 'Motorcycle',
		value: 400,
		buyable: false,
		emoji: '🏍️',
		rarity: 'common',
		picture: null,
		ctg: 'collectable',
		description: 'Gives you passive income.',
	},
	'scooter': {
		name: 'Scooter',
		value: 150,
		buyable: false,
		emoji: '🛴',
		rarity: 'common',
		picture: null,
		ctg: 'collectable',
		description: 'Gives you passive income.',
	},
	'jet plane': {
		name: 'Jet plane',
		value: 7000,
		buyable: false,
		emoji: '✈️',
		rarity: 'epic',
		picture: null,
		ctg: 'collectable',
		description: 'Gives you passive income.',
	},
	'prop plane': {
		name: 'Prop plane',
		value: 3000,
		buyable: false,
		emoji: '🛩️',
		rarity: 'rare',
		picture: null,
		ctg: 'collectable',
		description: 'Gives you passive income.',
	},
	'sailboat': {
		name: 'Sailboat',
		value: 2000,
		buyable: false,
		emoji: '⛵',
		rarity: 'uncommon',
		picture: null,
		ctg: 'collectable',
		description: 'Gives you passive income.',
	},
	'motorboat': {
		name: 'Motorboat',
		value: 1250,
		buyable: false,
		emoji: '🚤',
		rarity: 'uncommon',
		picture: null,
		ctg: 'collectable',
		description: 'Gives you passive income.',
	},
	'office': {
		name: 'Office',
		value: 500000,
		buyable: true,
		emoji: '🏢',
		rarity: 'legendary',
		picture: null,
		ctg: 'collectable',
		description: 'Gives you passive income.',
	},
	'stadium': {
		name: 'Stadium',
		value: 1000000,
		buyable: true,
		emoji: '🏟️',
		rarity: 'legendary',
		picture: null,
		ctg: 'collectable',
		description: 'Gives you passive income.',
	},
	'castle': {
		name: 'Castle',
		value: 750000,
		buyable: true,
		emoji: '🏰',
		rarity: 'legendary',
		picture: null,
		ctg: 'collectable',
		description: 'Gives you passive income. Suggested by Garbiel.',
	},
	'ship': {
		name: 'Ship',
		value: 6000,
		buyable: false,
		emoji: '🚢',
		rarity: 'rare',
		picture: null,
		ctg: 'collectable',
		description: 'Gives you passive income.',
	},


























	// WEAPONS
	'training sword': {
		name: 'Training Sword',
		value: 2500,
		buyable: true,
		emoji: '<:training_sword:735471230932615198>',
		rarity: 'uncommon',
		picture: 'training_sword.png',
		ctg: 'equipment',
		slot: 'weapon',
		damage: [40, 20],
		description: 'Your basic training sword.',
	},

	'training staff': {
		name: 'Training Staff',
		value: 3000,
		buyable: true,
		emoji: '<:training_staff:735472268616007692>',
		rarity: 'uncommon',
		picture: 'training_staff.png',
		ctg: 'equipment',
		slot: 'weapon',
		damage: [45, 17],
		description: 'Your basic training staff.',
	},
	'gun': {
		name: 'Gun',
		value: 6500,
		buyable: false,
		emoji: '<:gun:727585753818857563>',
		rarity: 'rare',
		picture: 'gun.png',
		ctg: 'equipment',
		slot: 'weapon',
		damage: [84, 23],
		description: 'What are you gonna do with a gun, shoot people?',
	},
	'water': {
		name: 'Water',
		value: 20000,
		buyable: false,
		emoji: '<:water:764107424138788884>',
		rarity: 'epic',
		picture: 'water.png',
		ctg: 'equipment',
		slot: 'weapon',
		damage: [140, 40],
		description: 'WATER! DO YOU WANT TO POISON ME!?',
	},
	'spiky rock': {
		name: 'Spiky Rock',
		value: 500,
		buyable: false,
		emoji: '<:m_t_01:764104296987230209>',
		rarity: 'common',
		picture: 'spiky_rock.png',
		ctg: 'equipment',
		slot: 'weapon',
		damage: [18, 4],
		description: 'Its stoning time.',
	},
	'rijkszwaard': {
		name: 'Rijkszwaard',
		value: 649000,
		buyable: false,
		emoji: '<:rijkszwaard:764108434542428210>',
		rarity: 'legendary',
		picture: 'rijkszwaard.png',
		ctg: 'equipment',
		slot: 'weapon',
		damage: [237, 54],
		description: 'The legendary Sword of the State. Handcrafted by the best Dutch blacksmiths',
	},
	'shortbow': {
		name: 'Shortbow',
		value: 5380,
		buyable: false,
		emoji: '<:shortbow:764109316319215667>',
		rarity: 'rare',
		picture: 'shortbow.png',
		ctg: 'equipment',
		slot: 'weapon',
		damage: [84, 19],
		description: 'A pretty nice shortbow made of surpisingly flexible wood.',
	},
	'wooden club': {
		name: 'Wooden Club',
		value: 1000,
		buyable: false,
		emoji: '<:wooden_club:769192453214568448>',
		rarity: 'common',
		picture: 'wooden_club.png',
		ctg: 'equipment',
		slot: 'weapon',
		damage: [39, 9],
		description: 'A wooden club with a leather bound handle.',
	},
	'enchanted waraxe': {
		name: 'Enchanted Waraxe',
		value: 13500,
		buyable: false,
		emoji: '<:enchanted_waraxe:769194262641508392>',
		rarity: 'epic',
		picture: 'enchanted_waraxe.png',
		ctg: 'equipment',
		slot: 'weapon',
		damage: [98, 33],
		description: 'An high quality waraxe that has been enchanted by a mage.',
	},






















	// OFFHANDS
	'training shield': {
		name: 'Training Shield',
		value: 2000,
		buyable: true,
		emoji: '<:training_shield:774970651689615361>',
		rarity: 'uncommon',
		picture: 'training_shield.png',
		ctg: 'equipment',
		slot: 'offhand',
		armor: [10, 3],
		description: 'A basic shield given to trainee soldiers.',
	},
	'bronze buckler': {
		name: 'Bronze Buckler',
		value: 6173,
		buyable: false,
		emoji: '<:bronze_buckler:774975150999339018>',
		rarity: 'rare',
		picture: 'bronze_buckler.png',
		ctg: 'equipment',
		slot: 'offhand',
		armor: [31, 8],
		description: 'A beautifully crafted bronze buckler made by artisan elves.',
	},
	'steinturm': {
		name: 'Steinturm',
		value: 783020,
		buyable: false,
		emoji: '<:steinturm:774979910351585290>',
		rarity: 'legendary',
		picture: 'steinturm.png',
		ctg: 'equipment',
		slot: 'offhand',
		armor: [80, 28],
		description: 'An ancient magical stone shield that doesnt seem to take any damage.',
	},
	'obsidian shield': {
		name: 'Obsidian Shield',
		value: 19485,
		buyable: false,
		emoji: '<:obsidian_shield:774979910040682516>',
		rarity: 'epic',
		picture: 'obsidian_shield.png',
		ctg: 'equipment',
		slot: 'offhand',
		armor: [53, 19],
		description: 'A solid obsidian shield that was forged in the deepest layers of earth.',
	},



}; 