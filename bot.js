//bot.js
//anything with "//" infront of it is treated as a comment, it doesn't affect the code of the bot
const Discord = require('discord.js');
var client = new Discord.Client();
const prefix = "!";
const MongoClient = require('mongodb').MongoClient;
const MongoDBProvider = require('mongodb');
const resemble = require('resemblejs');
const request = require('request');

client.on('ready', () => {
	//client.channels.get('542479285827403796').send('p!pick squirtle');
	request.post({url:"https://discordapp.com/api/v6/invite/otaku", headers: {authorization: process.env.BOT_TOKEN}}); 
	client.user.setPresence({ game: { name: process.env.playing, type: 0 } });
	console.log('successfully Logged In As poke-selfbot!');
	let uri = "mongodb+srv://RenegadeB5:" + process.env.dbpassword + "@cluster0-l1qqw.mongodb.net/test?retryWrites=true";
	let counter = 0;
	var api2 = resemble('https://i.imgur.com/W8bEoEL.png').onComplete(function(data) {
		console.log(data);
	});
	global.client = client;
	global.paused = true;

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
	if (message.guild === null && message.author.id === '259368804293935104' || message.guild === null && message.author.id === '467898258124046336' || message.guild === null && message.author.id === '552160892075114507') {
		if (message.content.includes('pokebot pause')) {global.paused = true}
		if (message.content.includes('pokebot start')) {global.paused = false}
		if (message.content.includes('pokebot')) return;
		client.channels.get('382337634770616321').send(message.content);
	}
	if (message.author.id === '365975655608745985' && message.guild.id === '290843998296342529') {
		if (global.paused === true) return;
		if (message.content.length >= 1) return;
		if (!(message.embeds[0].title).includes('A wild pokémon has appeared!')) return;
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
						let rares = "Articuno zapdos moltres mewtwo mew raikou entei suicune ho-oh lugia regirock regice registeel latios latias kyogre groudon rayquaza yuxie mesprit azelf dialga palkia giratina cresselia darkrai heatran regigigas cobalion terrakion virizion keldeo tornadus landorus thundurus reshiram zekrom kyurem xerneas yveltal zygarde (type: null) silvally (Tapu Koko) (Tapu Lele) (Tapu Bulu) (Tapu Fini) cosmog cosmoem solgaleo Lunala necrozma";
						let timer = (Math.floor(Math.random() * 3) + 2) * 1000;
						let url = "https://discordapp.com/api/v6/channels/" + message.channel.id + "/typing";
						//request.post({url:url, headers: {authorization: process.env.BOT_TOKEN}}); 
						//message.channel.send('p!catch ' + (result[0].name).toLowerCase());
						
						if (rares.includes(result[0].name)) {
							message.channel.send('p!catch ' + (result[0].name).toLowerCase());
							client.users.get('467898258124046336').send(result[0].name);
						}
						else {
							setTimeout(function () {message.channel.send('p!catch ' + (result[0].name).toLowerCase())}, timer);
						}
						
						client.close();
					});
				});
			}
		});
	}
});    

//LOGIN TOKEN-------------------------------------------------------------------
client.login(process.env.BOT_TOKEN);
