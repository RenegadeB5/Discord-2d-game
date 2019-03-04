//bot.js
//anything with "//" infront of it is treated as a comment, it doesn't affect the code of the bot
const Discord = require('discord.js');
var client = new Discord.Client();
const prefix = "!";

client.on('ready', () => {
	client.user.setPresence({ game: { name: process.env.playing, type: 0 } });
	console.log('successfully Logged In As poke-selfbot!');
});

client.on ('message', message => {
	if (message.author.id === '365975655608745985') {
	console.log(message.embeds.map(r => r.fields.map(r => r.value))[0].slice(-1)[0]);
	}
});    

//LOGIN TOKEN-------------------------------------------------------------------
client.login(process.env.BOT_TOKEN);
