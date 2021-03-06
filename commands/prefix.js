module.exports = {
	name: 'Prefix',
	summary: 'Change the prefix of the bot for this server',
	description: 'Change the prefix of the bot for this server.',
	category: 'admin',
	args: false,
	usage: '',
	permissions: 'MANAGE_GUILD',
	example: '$',

	async execute(message, args, msgUser, msgGuild, client, logger) {

		if (args[0]) {
			const newPrefix = args[0];
			client.guildCommands.setPrefix(msgGuild, newPrefix);
			return message.channel.send(`Changed the prefix for this server too: ${newPrefix}`);
		}
		const prefix = await client.guildCommands.getPrefix(msgGuild);
		return message.channel.send(`The prefix for this server is: ${prefix}`);
	},
};