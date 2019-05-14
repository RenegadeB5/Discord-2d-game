//bot.js
//anything with "//" infront of it is treated as a comment, it doesn't affect the code of the bot
const Discord = require('discord.js');
const client = new Discord.Client();
const resemble = require('resemblejs');
const request = require('request');

client.on('ready', () => {
	console.log('Successfully logged in as a discord game bot!');
	//client.channels.get('576427384262361128').send('.                                                                 .\n.                                                                 .\n.                                                                 .\n.                                                                 .\n.                                                                 .\n.                                                                 .\n.                                                                 .\n.                                                                 .\n.                                                                 .\n.                                                                 .\n.                                                                 .\n.                                                                 .\n.                                                                 .\n.                                                                 .\n.                                                                 .\n.                                                                 .\n.                    🛦                                        .');						
	let board = client.channels.get('576427384262361128').fetchMessage('576430855220887593');
	console.log(board.content);
});

client.on ('message', message => {
	
});    
	

client.login(process.env.BOT_TOKEN);
