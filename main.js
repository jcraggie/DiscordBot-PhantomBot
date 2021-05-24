// RELEASING AS v3.0.0 release 2021-05-23

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

// const ApiSwgohHelp = require('api-swgoh-help');
// const swapi = new ApiSwgohHelp({
//     "username":" ",
//     "password":" !"
// });



//const phantomBotFooter = "PhantomBot made by jcrAggie for the PhantomAlliance.";

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})



// should be the last line in code
client.login(process.env.BOT_TOKEN);

