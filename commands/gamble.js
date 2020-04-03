const emojiCharacters = require('../emojiCharacters');
module.exports = {
	name: 'gamble',
	description: 'Starts a minigame where you need to guess what number is correct',
	admin: false,
	aliases: ["guess"],
	args: true,
	usage: 'money',
	async execute(msg, args, profile, bot, options, ytAPI, logger) {
		const currentAmount = await profile.getBalance(msg.author.id);
		const gambleAmount = args[0];
		const filter = (reaction, user) => {
			return [emojiCharacters[1], emojiCharacters[2], emojiCharacters[3], emojiCharacters[4], emojiCharacters[5]].includes(reaction.emoji.name) && user.id === msg.author.id;
		};

		if (!gambleAmount || isNaN(gambleAmount)) return msg.channel.send(`Sorry ${msg.author}, that's an invalid amount.`);
		if (gambleAmount > currentAmount) return msg.channel.send(`Sorry ${msg.author}, you only have ${currentAmount}.`);
		if (gambleAmount <= 0) return msg.channel.send(`Please enter an amount greater than zero, ${msg.author}.`);

		const answer = Math.floor((Math.random() * 5) + 1);

		await msg.channel.send(`You have bet ${gambleAmount}💰.\nGuess the number between 1 and 5.`)
			.then(() => {
				msg.channel.lastMessage.react(emojiCharacters[1]);
				msg.channel.lastMessage.react(emojiCharacters[2]);
				msg.channel.lastMessage.react(emojiCharacters[3]);
				msg.channel.lastMessage.react(emojiCharacters[4]);
				msg.channel.lastMessage.react(emojiCharacters[5]);
			})
			.catch(e => {
				logger.log('error', `One of the emojis failed to react because of:\n${e}`)
				return msg.reply('One of the emojis failed to react.');
			});


		msg.channel.lastMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
			.then(async collected => {
				const reaction = collected.first();


				if (reaction.emoji.name === emojiCharacters[answer]) {
					profile.addMoney(msg.author.id, gambleAmount);
					const balance = await profile.getBalance(msg.author.id);
					return msg.channel.send(`Correct!!!! You have successfully won ${gambleAmount}💰.\nYour current balance is ${balance}💰`);
				} else {
					profile.addMoney(msg.author.id, -gambleAmount);
					const balance = await profile.getBalance(msg.author.id);
					return msg.channel.send(`The correct answer was ${answer}. You lost ${gambleAmount}💰.\nYour current balance is ${balance}💰`);
				}
			})
			.catch(collected => {
				message.reply('You failed to react in time.');
				logger.log('error', collected);
			});
	},
};