const Discord = require('discord.js');
const { Op } = require('sequelize');
const { CurrencyShop } = require('../dbObjects');
module.exports = {
	name: 'item',
	summary: 'Shows information about a specific item',
	description: 'Shows information about a specific item.',
	category: 'info',
	aliases: ['items'],
	args: true,
	usage: '<item>',

	async execute(msg, args, msgUser, profile, guildProfile, bot, options, logger, cooldowns) {
		const bAvatar = msg.author.displayAvatarURL();
		let temp = '';

		for (let i = 0; i < args.length; i++) {
			if (temp.length > 2) temp += ` ${args[i]}`;
			else temp += `${args[i]}`;
		}

		const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: temp } } });
		if (!item) return msg.channel.send(`\`${temp}\` is not a valid item.`, { code: true });

		const embed = new Discord.MessageEmbed()
			.setTitle(`${item.emoji}__${item.name}(s)__`)
			.setDescription(item.description)
			.addField('Cost', `**${item.cost}💰**`, true)
			.addField('Category', item.ctg, true)
			.addField('Rarity', item.rarity, true)
			.setTimestamp()
			.setFooter('Neia', bAvatar)
			.attachFiles(`assets/rarity/${item.rarity}.jpg`)
			.setImage(`attachment://${item.rarity}.jpg`);

		if (item.picture) embed.attachFiles(`assets/items/${item.picture}`)
			.setThumbnail(`attachment://${item.picture}`);

		return msg.channel.send(embed);
	},
};