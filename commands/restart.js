const pm2 = require('pm2');
module.exports = {
	name: 'restart',
	description: 'Restarts the bot. (Owner only)',
	needsowner: true,
	needsdb: true,
	category: "owner",
	execute(message, args) {
		message.reply("restarting")
		pm2.connect();
		pm2.restart("0");
	},
};