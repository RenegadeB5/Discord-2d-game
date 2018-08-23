//bot.js
//anything with "//" infront of it is treated as a comment, it doesn't affect the code of the bot
const Discord = require('discord.js');
const prefix = "!";
var client = new Discord.Client();

client.on('ready', () => {
    const guildNames = client.guilds.map(g => g.name).join("\n")
    client.user.setPresence({ game: { name: process.env.playing, type: 0 } });
    console.log('successfully Logged In As spam bot!');
    console.log(guildNames);
});
client.on ('message', message => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();  
  if (command === "role") {
      if (message.author.id === process.env.ownerID) {
         let [task] = args; 
         let member = message.mentions.members.first();
         let m = args.slice(2).join(" ");  
         let role = message.guild.roles.find("name", m); 
           if (task === "add") {
               console.log(role);
               member.addRole(role).catch(console.error);
           } 
          else {
               member.removeRole(role).catch(console.error);
          }
      } 
      else {
         message.channel.send('Only Rene can use this command. ');
        }
  }});    

client.on ('message', message => {
  if (message.content === "Crackhead") {
    message.channel.send('white');
  }
});    

client.on ('message', message => {
  if (message.content === "!list roles") {
           var role = message.guild.roles.array();
           console.log(role);
  }
});

client.on ('message', message => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (command === "spam") {
        if (message.author.id === process.env.ownerID) {
          let [ammount] = args;
          let text = args.slice(1).join(" "); 
          message.delete();  
           
                     function repeat(func, times) {
                    func();
                    --times && repeat(func, times);
                }
          
        repeat(function () { message.channel.send(text); }, ammount);
            }     
      
       else { 
                message.channel.send('Only Rene can use this command. ');
  }
  }});   
//LOGIN TOKEN-------------------------------------------------------------------
client.login(process.env.BOT_TOKEN);
