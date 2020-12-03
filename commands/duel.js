const Discord = require('discord.js');
module.exports = {
	name: 'duel',
	summary: 'Duel other players to the death',
	description: 'Duel other players to the death. If you kill them you will gain a portion of their current items and money.',
	args: true,
	usage: '<target>',
	category: 'pvp',
	aliases: ['fight'],

	async execute(message, args, msgUser, client, logger) {
		let round = 1;
		let description = '';

		const embed = new Discord.MessageEmbed()
			.setColor('#fc0000')
			.setFooter('You can only attack people on the same server', client.user.displayAvatarURL());


		// Get target
		const targetDiscord = message.mentions.users.first();
		const targetUser = await client.characterCommands.getUser(targetDiscord.id);


		// Get stats for both users
		const hostStats = await client.characterCommands.calculateStats(msgUser);
		const targetStats = await client.characterCommands.calculateStats(targetUser);


		const host = {
			stats: hostStats,
			equipment: client.characterCommands.getEquipment(msgUser),
			hp: hostStats.maxHP,
			user: message.author,
		};
		const target = {
			stats: targetStats,
			equipment: client.characterCommands.getEquipment(targetUser),
			hp: targetStats.maxHP,
			user: targetDiscord,
		};

		// Add hp counters
		embed.addField(`${message.author.username}'s HP`, `${client.util.formatNumber(host.hp)}<:health:730849477765890130>`, true)
			.addField(`${targetDiscord.username}'s HP`, `${client.util.formatNumber(target.hp)}<:health:730849477765890130>`, true);


		let sentMessage = await message.channel.send(embed.setTitle(`${message.author.username} vs ${targetDiscord.username}`))
		playRound();


		function playTurn(attacker, defender) {
			let damage = Math.round(
				attacker.stats.Damage * (
					1 + (Math.random() * 0.1)
				));


			// Determine critical hit
			if (Math.random() * 100 <= attacker.stats.Critchance) {
				description += '**Critical hit!!!**\n';
				damage *= 1.8;
			}

			// damage reduction %
			const armor = defender.stats.Armor;
			const dr = armor / (armor + 485); // Formula is armor / (armor  + 400 + (85 * level))
			damage *= 1 - (dr / 100);
			damage = Math.round(damage);

			defender.hp -= damage;
			if (defender.hp < 0) defender.hp = 0;

			const weapon = client.characterCommands.getItem(attacker.equipment['Main hand']);
			description += `${attacker.user.username} dealt ${client.util.formatNumber(damage)} with their ${weapon.emoji}${weapon.name}\n`;
			return setEmbed(sentMessage);
		}


		function playRound() {
			setTimeout(function () {
				description += `\n__**Round ${round}**__\n`;

				if (target.stats.Dexterity >= host.stats.Dexterity) {
					playTurn(target, host);
					if (host.hp <= 0) {
						endGame();
						return setEmbed(sentMessage);
					}
					setTimeout(function () { playTurn(host, target); }, 1000);
				}
				else {
					playTurn(host, target);
					if (target.hp <= 0) {
						endGame();
						return setEmbed(sentMessage);
					}
					setTimeout(function () { playTurn(target, host); }, 1000);
				}

				round++;

				if (host.hp > 0 && target.hp > 0) playRound();
				else {
					endGame();
					return setEmbed(sentMessage);
				}
			}, 2000);
		}


		async function setEmbed(msg) {
			embed.spliceFields(0, 2, [
				{ name: `${message.author.username}'s HP`, value: `${client.util.formatNumber(host.hp)}<:health:730849477765890130>`, inline: true },
				{ name: `${targetDiscord.username}'s HP`, value: `${client.util.formatNumber(target.hp)}<:health:730849477765890130>`, inline: true },
			]);
			msg.edit(embed.setDescription(description));

			if (description.length > 1800) {
				sentMessage = await message.channel.send(embed.setDescription(description));
				description = '';
			}
		}

		function endGame() {
			let winner;
			if (target.hp <= 0) winner = host;
			else if (host.hp <= 0) winner = target;

			description += `\n**${winner.user} has won!**`;
		}

	},
};