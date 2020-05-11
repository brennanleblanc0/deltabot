const package = require('../package.json');
const Discord = require('discord.js');
module.exports = {
    name: 'info',
    description: `Gives information about ${package.name}.`,
    guildOnly: true,
    aliases: ['stats'],
    cooldown: 10,
    needsclient: true,
    execute(message, args, client) {
    const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#32CD32')
    .setTitle(package.name)
    .setThumbnail(client.user.avatarURL)
	.setDescription(package.description)
    .addField('Version:', package.version)
    .setURL("https://github.com/deltadiscordbot/deltabot")
	.addField('Library:','discord.js')
	.addField('Creator:', package.author)
	.setTimestamp()
	.setFooter('version: ' + package.version);

    message.channel.send(exampleEmbed);
    },
};