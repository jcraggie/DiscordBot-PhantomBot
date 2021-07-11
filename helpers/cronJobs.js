//function code
const { GuildEmoji } = require('discord.js'); // I did not write this line; inserted by VS Code?


function startGetUpdatesCron(client, message, args, Discord,swapi, ApiSwgohHelp) {
    var CronJob = require('cron').CronJob;
    var mongoUtils = require('./mongoHelper');
    var fileUtils = require('./fileHelper');

    var startTime = '0 00 02 * * *' // every day at 0300am CST 0 00 03 * * *
    var startTz = 'America/Chicago';

    var cronGetUpdates = new CronJob(startTime, function() {
        const isCron = true;

        console.log('---STARTING CRON GET UPDATES');

        // message.channel.send('testupdatefcn');
        mongoUtils.getGuildUpdates(client, message, args, Discord,swapi, ApiSwgohHelp, isCron);
        
        //log the event to Discord (jcrAggie server) and the console
        // fileUtils.logToDiscordAndConsole(client, message, args, Discord, isCron);

        // //log the event to jcrAggie server #phantom-ready channel
        // client.channels.cache.get('605087450573963362').send("Bot issued cronGetUpdates");

        //log the event to the console
        console.log('---SENT CRON_GET_UPDATES'); 

    }, null, true, startTz); // central
    cronGetUpdates.start(); 
    console.log('---------SETTING UP CRON JOB FOR GETTING UPDATES FROM THE API'); 

}//end startGetUpdatesCron

function startSendUpdateEmbedsCron(client, message, args, Discord,swapi, ApiSwgohHelp) {
    var CronJob = require('cron').CronJob;
    var mongoUtils = require('./mongoHelper');
    var fileUtils = require('./fileHelper');

    var startTime = '0 15 02 * * *' // every day at 0315am CST 0 15 03 * * *
    var startTz = 'America/Chicago';

    var cronGetUpdates = new CronJob(startTime, function() {
        const isCron = true;

        console.log('---STARTING CRON GET UPDATES');

        // message.channel.send('testupdatefcn');
        mongoUtils.sendGuildUpdates(client, message, args, Discord,swapi, ApiSwgohHelp, isCron);
        
        //log the event to Discord (jcrAggie server) and the console
        // fileUtils.logToDiscordAndConsole(client, message, args, Discord);

        //log the event to jcrAggie server #phantom-ready channel
        // client.channels.cache.get('605087450573963362').send("Bot issued cronSendUpdates");

        //log the event to the console
        console.log('---SENT CRON_SEND_UPDATE_EMBEDS'); 

    }, null, true, startTz); // central
    cronGetUpdates.start(); 
    console.log('---------SETTING UP CRON JOB FOR SENDING UPDATE EMBEDS TO ALL SERVERS'); 

}//end startSendUpdateEmbedsCron

function wakeUpPhantomBot(client, message, args, Discord,swapi, ApiSwgohHelp) {
    var CronJob = require('cron').CronJob;
    var mongoUtils = require('./mongoHelper');
    var fileUtils = require('./fileHelper');

    // var startTime = '0 */25 * * * *' // every 25 minutes
    var startTime = '0 50 01 * * *' // every day at 0150am CST 0 00 03 * * *
    var startTz = 'America/Chicago';

    var cronWakeUp = new CronJob(startTime, function() {
        const isCron = true;
        console.log('---I\'M AWAKE!');
    }, null, true, startTz); // central
    cronWakeUp.start(); 
    console.log('---------SETTING UP CRON JOB FOR WAKING UP PHANTOM BOT'); 

}//end wakeUpPhantomBot







//shows these functions to the outside world
module.exports = {
    startGetUpdatesCron,
    startSendUpdateEmbedsCron,
    wakeUpPhantomBot
    

};