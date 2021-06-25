// RELEASING AS v3.0.0 release 2021-05-23

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

var CronJob = require('cron').CronJob;

//135718294 jcrAggie (Rebellion) Allycode
//418877148 SavageWill (Empire) Allycode
//924484782 Andosan (Havoc) Allycode
//618277879 Kal Skirata (Walon-Rogue) Allycode
//993689571 chewbaccababe (Order) Allycode
//582412773 vRex (Uprising) Allycode
//315585918 General Leia Organa (Lotus - in-game name is Ruby Starr Wynn) Allycode
//681711581 Jingle's alt (Phoundlings) Allycode
//166494741 Whitefly425 (Hope) Allycode


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

