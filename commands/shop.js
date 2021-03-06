const Discord = require('discord.js');
const items = require('../data/items');
module.exports = {
	name: 'Shop',
	summary: 'Shows all the shop items',
	description: 'Shows all the shop items.',
	category: 'info',
	aliases: ['store'],
	args: false,
	usage: '',

	execute(message, args, msgUser, msgGuild, client, logger) {

		let reactions = '__**Reactions:**__\n';
		let powerups = '__**Powerups:**__\n';
		let chests = '__**Chests:**__\n';
		let equipment = '__**Equipment:**__\n';

		Object.values(items).sort((a, b) => a.value - b.value).map((i) => {
			if (i.buyable) {
				if (i.ctg == 'reaction') reactions += `${i.emoji} ${i.name}: ${client.util.formatNumber(i.value)}💰\n`;
				else if (i.ctg == 'powerup') powerups += `${i.emoji} ${i.name}: ${client.util.formatNumber(i.value)}💰\n`;
				// else if (i.ctg == 'equipment') equipment += `${i.emoji}${i.name}: ${client.util.formatNumber(i.value)}💰\n`;
			}
		});

		const description = `${powerups}\n${reactions}\n`;

		const embed = new Discord.MessageEmbed()
			.setTitle('Project Neia Shop')
			.setThumbnail(client.user.displayAvatarURL())
			.setDescription(description)
			.setColor('#f3ab16')
			.setFooter('Use the items command to see the full item list.', client.user.displayAvatarURL());

		return message.channel.send(embed);
	},
};