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
	let counter = 23;
	var api = resemble('https://media.discordapp.net/attachments/542479285827403796/553478705754800128/PokecordSpawn.jpg?width=300&height=300').onComplete(function(data) {
		console.log(data);
	});
	var api2 = resemble('https://i.imgur.com/Q4sZDZj.png').onComplete(function(data) {
		console.log(data);
	});
	client.channels.get('547950225327783976').send('p!info Blastoise');

	function farm() {
		if (counter >= 45) return;
		client.channels.get('547950225327783976').send('p!info Blastoise');
		counter += 1;
	}
	MongoClient.connect(uri, function(err, client) {
			if (err) {
				console.error('An error occurred connecting to MongoDB: ', err);
			}
			else {
				const collection = client.db("pokedex").collection("pokemon");
				collection.find({}).toArray(function(err, result) {
					if (err) throw err;
					global.pokedex = result;
				});
			}
	});
});

client.on ('message', message => {
	if (message.author.id === '365975655608745985' && message.channel.id === '547950225327783976') {
		console.log(pokedex);
		console.log(message.content);
		console.log(message.embeds[0].image.url);
		let uri = "mongodb+srv://RenegadeB5:" + process.env.dbpassword + "@cluster0-l1qqw.mongodb.net/test?retryWrites=true";
		MongoClient.connect(uri, function(err, client) {
			if (err) {
				console.error('An error occurred connecting to MongoDB: ', err);
			}
			else {
				const collection = client.db("pokedex").collection("pokemon");
			}
		});
	}
});    

//LOGIN TOKEN-------------------------------------------------------------------
client.login(process.env.BOT_TOKEN);
