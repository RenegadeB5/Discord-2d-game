//bot.js
//anything with "//" infront of it is treated as a comment, it doesn't affect the code of the bot
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "!";
const MongoClient = require('mongodb').MongoClient;
const MongoDBProvider = require('mongodb');
const resemble = require('resemblejs');
const request = require('request');
const tokens = process.env.TOKENS.split(",");
const tokens2 = process.env.TOKENS2.split(",");
const tokens3 = process.env.TOKENS3.split(",");
const tokens4 = process.env.TOKENS4.split(",");
const tokens5 = process.env.TOKENS5.split(",");

let count = 0;                                                  														
function spam() {
	if (count === 5) count = 0;
	request.post({url:"https://discordapp.com/api/v6/channels/557948110089748500/messages", headers: {authorization: tokens[count]}, form: {content: 't'}});
	request.post({url:"https://discordapp.com/api/v6/channels/558492062270357504/messages", headers: {authorization: tokens2[count]}, form: {content: 't'}});
	//request.post({url:"https://discordapp.com/api/v6/channels/558726357123727363/messages", headers: {authorization: tokens3[count]}, form: {content: 't'}});
	request.post({url:"https://discordapp.com/api/v6/channels/559033871434383380/messages", headers: {authorization: tokens4[count]}, form: {content: 't'}});
	request.post({url:"https://discordapp.com/api/v6/channels/559035339038130177/messages", headers: {authorization: tokens5[count]}, form: {content: 't'}});
	count++;
};
setTimeout(function () {setInterval(spam, 300)}, 10000);

for (const item of tokens) {
	request.post({url:"https://discordapp.com/api/v6/invite/GU4kaXS", headers: {authorization: item}}); 
};
for (const item of tokens2) {
	request.post({url:"https://discordapp.com/api/v6/invite/JuNrru", headers: {authorization: item}}); 
};
/*for (const item of tokens3) {
	request.post({url:"https://discordapp.com/api/v6/invite/wSmEUk", headers: {authorization: item}}); 
};*/
for (const item of tokens4) {
	request.post({url:"https://discordapp.com/api/v6/invite/F3NK8n", headers: {authorization: item}}); 
};
for (const item of tokens5) {
	request.post({url:"https://discordapp.com/api/v6/invite/748tzC", headers: {authorization: item}}); 
};
	
client.on('ready', () => {
	//client.channels.get('542479285827403796').send('p!pick squirtle');
	request.post({url:"https://discordapp.com/api/v6/invite/ZdVCjG", headers: {authorization: process.env.BOT_TOKEN}}); 
	request.post({url:"https://discordapp.com/api/v6/invite/748tzC", headers: {authorization: process.env.BOT_TOKEN}});
	request.post({url:"https://discordapp.com/api/v6/invite/QRxrV4", headers: {authorization: process.env.BOT_TOKEN}});
	request.post({url:"https://discordapp.com/api/v6/invite/cR28JC", headers: {authorization: process.env.BOT_TOKEN}});
	client.user.setPresence({ game: { name: process.env.playing, type: 0 } });
	console.log('successfully Logged In As poke-selfbot!');
	let uri = "mongodb+srv://RenegadeB5:" + process.env.dbpassword + "@cluster0-l1qqw.mongodb.net/test?retryWrites=true";
	global.client = client;
	global.paused = false;

});

client.on ('message', message => {
	let rares = "articuno zapdos moltres mewtwo mew raikou entei suicune ho-oh lugia regirock regice registeel latios latias kyogre groudon rayquaza yuxie mesprit azelf dialga palkia giratina cresselia darkrai heatran regigigas cobalion terrakion virizion keldeo tornadus landorus thundurus reshiram zekrom kyurem xerneas yveltal zygarde (type: null) silvally (tapu koko) (tapu lele) (tapu bulu) (tapu fini) cosmog cosmoem solgaleo lunala necrozma";
	if (message.guild === null && message.author.id === '259368804293935104' || message.guild === null && message.author.id === '467898258124046336' || message.guild === null && message.author.id === '552160892075114507') {
		if (message.content.includes('pokebot pause')) {global.paused = true}
		if (message.content.includes('pokebot start')) {global.paused = false}
		if (message.content.includes('pokebot')) return;
		client.channels.get('547834242948661248').send(message.content);
	}
	if (message.author.id === '365975655608745985') {
		/*resemble(message.embeds[0].image.url).onComplete(function(data) {
			console.log(data.red.toString() + data.green.toString() + data.blue.toString() + data.alpha.toString());
			console.log(((message.embeds[0].title).slice(15)).replace('.', ''));
		});*/
		if (global.paused === true) return;
		if (message.content.length >= 1) return;
		if (!(message.embeds[0].title).includes('A wild pokémon has appeared!')) return;
		//let title = ((message.embeds[0].title).slice(15)).replace('.', '');
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
						let timer = (Math.floor(Math.random() * 3) + 2) * 1000;
						//let url = "https://discordapp.com/api/v6/channels/" + message.channel.id + "/typing";
						//request.post({url:url, headers: {authorization: process.env.BOT_TOKEN}}); 
						message.channel.send('p!catch ' + (result[0].name).toLowerCase());
						if (rares.includes((result[0].name).toLowerCase())) {
							global.client.users.get('467898258124046336').send(result[0].name + ' has been caught!');
						}
						/*if (rares.includes(result[0].name)) {
							message.channel.send('p!catch ' + (result[0].name).toLowerCase());
							client.users.get('467898258124046336').send(result[0].name);
						}
						else {
							setTimeout(function () {message.channel.send('p!catch ' + (result[0].name).toLowerCase())}, timer);
						}*/
						
						client.close();
					});
				});
			}
		});
	}
});    

//LOGIN TOKEN-------------------------------------------------------------------
client.login(process.env.BOT_TOKEN);
