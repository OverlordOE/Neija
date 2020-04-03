var moment = require('moment');
module.exports = {
	name: 'daily',
	description: 'Get your daily gift.',
	admin: false,
	aliases: ["gift"],
	args: false,
	cooldown: 5,
	async execute(msg, args, profile) {
		const lastDaily = await profile.getDaily(msg.author.id);
		const day = moment().dayOfYear();
		const reward = 10 + (Math.random() * 10);
		
		if (day > lastDaily) {

			msg.reply(`You got ${Math.floor(reward)}💰 from your daily 🎁, come back tomorrow for more`);
			profile.setDaily(msg.author.id);
			profile.addMoney(msg.author.id, reward);
		} else {
			msg.reply(`you have already gotten your daily 🎁, come back tomorrow`);
			profile.setDaily(msg.author.id);
		}

	},
};