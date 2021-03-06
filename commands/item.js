const Discord = require('discord.js');
const items = require('../data/items');
module.exports = {
	name: 'Item',
	summary: 'Shows information about a specific item',
	description: 'Shows information about a specific item.',
	category: 'info',
	aliases: ['items', 'i'],
	args: false,
	usage: '<item>',
	example: 'chest',

	execute(message, args, msgUser, msgGuild, client, logger) {
		let temp = '';
		let embed;

		for (let i = 0; i < args.length; i++) {
			if (temp.length > 2) temp += ` ${args[i]}`;
			else temp += `${args[i]}`;
		}


		if (temp) {
			const item = client.util.getItem(temp);
			if (!item) return message.reply(`${item} is not a valid item`);

			embed = new Discord.MessageEmbed()
				.setTitle(`${item.emoji}${item.name}`)
				.setDescription(item.description)
				.addField('Value', `${client.util.formatNumber(item.value)}💰`, true)
				.addField('Buyable', item.buyable, true)
				.addField('Category', item.ctg, true)
				.setFooter('Use the command without arguments to see the item list', client.user.displayAvatarURL())

			if (item.picture) embed.attachFiles(`assets/items/${item.picture}`)
				.setImage(`attachment://${item.picture}`);

			if (item.rarity == 'uncommon') embed.setColor('#1eff00');
			else if (item.rarity == 'rare') embed.setColor('#0070dd');
			else if (item.rarity == 'epic') embed.setColor('#a335ee');
			else if (item.rarity == 'legendary') embed.setColor('#ff8000');
			else embed.setColor('#eeeeee');
		}

		else {
			let reactions = '__**Reactions:**__\n';
			let powerups = '__**Powerups:**__\n';

			Object.values(items).sort((a, b) => {
				if (a.name < b.name) return -1;
				if (a.name > b.name) return 1;
				return 0;
			}).map((i) => {

				if (i.ctg == 'reaction') reactions += `${i.emoji}${i.name}\n`;
				else if (i.ctg == 'powerup') powerups += `${i.emoji}${i.name}\n`;
			});

			const description = `${reactions}\n${powerups}\n`;

			embed = new Discord.MessageEmbed()
				.setTitle('Project Neia Item List')
				.setThumbnail(client.user.displayAvatarURL())
				.setDescription(description)
				.setColor('#f3ab16');
		}

		return message.channel.send(embed);
	},
};