// RELEASING AS v3.0.0 release 2021-05-23

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

var CronJob = require('cron').CronJob;

// const ApiSwgohHelp = require('api-swgoh-help');
// const swapi = new ApiSwgohHelp({
//     "username":" ",
//     "password":" !"
// });

// 483433483109138433 PhantomAlliance Server ID

// 116902168698683398 jcraggie Server ID
// 603591430887440395 jcrAggie Server/# testing
// 605087450573963362 jcrAggie Server/# phantombot-ready

// 586379177331261470 Havoc #lounge



client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})



// should be the last line in code
client.login(process.env.BOT_TOKEN);

