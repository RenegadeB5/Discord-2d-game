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
	var api = resemble('https://static.gamespot.com/uploads/scale_super/1575/15759911/3507055-pokemonswordshield-thingswewant-promo.jpg').onComplete(function(data) {
		console.log(data);
	});

	function farm() {
		if (counter >= 45) return;
		client.channels.get('547950225327783976').send('p!pokedex ' + counter);
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
		let pokemon = message.embeds.map(r => r.fields.map(r => r.name))[0];
		let uri = "mongodb+srv://RenegadeB5:" + process.env.dbpassword + "@cluster0-l1qqw.mongodb.net/test?retryWrites=true";
		if (pokemon === undefined) return;
		MongoClient.connect(uri, function(err, client) {
			if (err) {
				console.error('An error occurred connecting to MongoDB: ', err);
			}
			else {
				const collection = client.db("pokedex").collection("pokemon");
				for (var i = 0; i <= pokemon.length-1; i++) {
					console.log(pokemon[i]);
					collection.insertOne({ name: pokemon[i]});
				}
			}
		});
	}
});    

//LOGIN TOKEN-------------------------------------------------------------------
client.login(process.env.BOT_TOKEN);
