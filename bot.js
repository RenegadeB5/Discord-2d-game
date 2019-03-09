//bot.js
//anything with "//" infront of it is treated as a comment, it doesn't affect the code of the bot
const Discord = require('discord.js');
var client = new Discord.Client();
const prefix = "!";
const MongoClient = require('mongodb').MongoClient;
const MongoDBProvider = require('mongodb');
const resemble = require('resemblejs');

client.on('ready', () => {
	client.user.setPresence({ game: { name: process.env.playing, type: 0 } });
	console.log('successfully Logged In As poke-selfbot!');
	let uri = "mongodb+srv://RenegadeB5:" + process.env.dbpassword + "@cluster0-l1qqw.mongodb.net/test?retryWrites=true";
	let counter = 0;
	var api2 = resemble('https://images-ext-1.discordapp.net/external/lN1NXBbJ2C2qEpOT2vuNRhJUQrAvwGIf1GdEMJVo0zs/https/i.imgur.com/pnCnErB.png?width=300&height=300').onComplete(function(data) {
		console.log(data);
	});

	MongoClient.connect(uri, function(err, client) {
			if (err) {
				console.error('An error occurred connecting to MongoDB: ', err);
			}
			else {
				const collection = client.db("pokedex").collection("pokemon");
				collection.find({}).toArray(function(err, result) {
					if (err) throw err;
					global.pokedex = result;
					client.close();
				});
			}
	});
});

client.on ('message', message => {
	if (message.author.id === '365975655608745985' && message.channel.id === '547950225327783976') {
		if (message.content.length >= 1) return;
		let title = ((message.embeds[0].title).slice(15)).replace('.', '');
		let uri = "mongodb+srv://RenegadeB5:" + process.env.dbpassword + "@cluster0-l1qqw.mongodb.net/test?retryWrites=true";
		MongoClient.connect(uri, function(err, client) {
			if (err) {
				console.error('An error occurred connecting to MongoDB: ', err);
			}
			else {
				const collection = client.db("pokedex").collection("pokemon");
				resemble(message.embeds[0].image.url).onComplete(function(data) {                                                                                                                                                                                          
					collection.find({imgid: data.red.toString() + data.green.toString() + data.blue.toString() + data.alpha.toString() }).toArray(function(err, result) {
						if (err) throw err;
						if (result[0] === undefined) return;
						client.channels.get('547950225327783976').send(result[0].name);
						client.close();
					});
				});
			}
		});
	}
});    

//LOGIN TOKEN-------------------------------------------------------------------
client.login(process.env.BOT_TOKEN);
