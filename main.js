const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

// const ApiSwgohHelp = require('api-swgoh-help');
// const swapi = new ApiSwgohHelp({
//     "username":"jcraggie",
//     "password":"StarSWGOHHELP6c69!"
// });



//const phantomBotFooter = "PhantomBot made by jcrAggie for the PhantomAlliance.";

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})

/* 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}




client.once('ready', () => {
    console.log('NewBot is online!');
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message,args);
    }


});


 */





// should be the last line in code
client.login('ODQ1MzQzMjUyNzkzNzg2NDE4.YKflQQ.I0g26xQrgnOuIjJsmKOZ4KNcgCk');

