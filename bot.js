//bot.js
//anything with "//" infront of it is treated as a comment, it doesn't affect the code of the bot
const Discord = require('discord.js');
var client = new Discord.Client();
const prefix = "!";
const MongoClient = require('mongodb').MongoClient;
const MongoDBProvider = require('mongodb');

client.on('ready', () => {
	client.user.setPresence({ game: { name: process.env.playing, type: 0 } });
	console.log('successfully Logged In As poke-selfbot!');
	setTimeout(function () {client.channels.get('547950225327783976').send('p!pokedex')}, 5000);
});

client.on ('message', message => {
	if (message.author.id === '365975655608745985' && message.channel.id === '547950225327783976') {
		console.log(message.content);
		let pokemon = message.embeds.map(r => r.fields.map(r => r.name))[0];
		let uri = "mongodb+srv://RenegadeB5:sapphyres@cluster0.mongodb.net/pokedex";
		if (pokemon === undefined) return;
 		console.log(pokemon);
		console.log(pokemon[5]);
		MongoClient.connect(uri, function(err, client) {
			if (err) {
				console.error('An error occurred connecting to MongoDB: ', err);
			}
			else {
				const collection = client.db("pokedex").collection("pokemon");
				collection.insertOne({ name: "Company Inc"}, function(err, res) {
					client.close();
				});
			}
		});
	}
});    

//LOGIN TOKEN-------------------------------------------------------------------
client.login(process.env.BOT_TOKEN);
