//function code
const { GuildEmoji } = require('discord.js'); // I did not write this line; inserted by VS Code?


function startGetUpdatesCron(client, message, args, Discord, swapi, ApiSwgohHelp) {
    var CronJob = require('cron').CronJob;
    var mongoUtils = require('./mongoHelper');
    var fileUtils = require('./fileHelper');

    var startTime = '0 00 13 * * *' // every day at 0300am CST 0 00 03 * * *
    var startTz = 'America/Chicago';

    var cronGetUpdates = new CronJob(startTime, function() {
        const isCron = true;

        console.log('---STARTING CRON GET UPDATES');

        // message.channel.send('testupdatefcn');
        mongoUtils.getGuildUpdates(client, message, args, Discord, swapi, ApiSwgohHelp, isCron);
        
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

function startSendUpdateEmbedsCron(client, message, args, Discord, swapi, ApiSwgohHelp) {
    var CronJob = require('cron').CronJob;
    var mongoUtils = require('./mongoHelper');
    var fileUtils = require('./fileHelper');

    var startTime = '0 15 13 * * *' // every day at 0315am CST 0 15 03 * * *
    var startTz = 'America/Chicago';

    var cronGetUpdates = new CronJob(startTime, function() {
        const isCron = true;

        console.log('---STARTING CRON GET UPDATES');

        // message.channel.send('testupdatefcn');
        mongoUtils.updateGuildEmbeds(client, message, args, Discord, swapi, ApiSwgohHelp, isCron);
        
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

function wakeUpPhantomBot() {
    var CronJob = require('cron').CronJob;
    var mongoUtils = require('./mongoHelper');
    var fileUtils = require('./fileHelper');

    // var startTime = '0 */25 * * * *' // every 25 minutes
    var startTime = '0 50 12 * * *' // every day at 0150am CST
    var startTz = 'America/Chicago';

    var cronWakeUp = new CronJob(startTime, function() {
        const isCron = true;
        console.log('---I\'M AWAKE!');
    }, null, true, startTz); // central
    cronWakeUp.start(); 
    console.log('---------SETTING UP CRON JOB FOR WAKING UP PHANTOM BOT'); 

}//end wakeUpPhantomBot


function sendHavocTicketReminder(client, Discord) {
    var CronJob = require('cron').CronJob;
    var mongoUtils = require('./mongoHelper');
    var fileUtils = require('./fileHelper');
    // HAVOC TICKET REMINDER 
    // 586379177331261470 Havoc #lounge  
    // 586291147169857556 PhantomHavoc role (members)

    var CronJob = require('cron').CronJob;

    var havocTime = '0 30 17 * * *' // should be 0 30 17 * * *
    var pHavTz = 'America/Chicago';

    var cronHavoc = new CronJob(havocTime, function() {

        console.log('---SENDING HAVOC TICKET REMINDER');

        let ticketImage = new Discord.MessageAttachment('./graphics/TicketReminder01.png');

        var globalVar = require('../global.js');
        let havocTicketReminder = globalVar.ticketEmbedTemp01

            .setTitle('phantomHAVOC 600 TICKET REMINDER!')
            .attachFiles(ticketImage)
            .setImage('attachment://TicketReminder01.png')
            .setDescription("<@&586291147169857556> Tickets are due in 1 hour!")

        //send message to Havoc lounge
        // client.channels.cache.get('586379177331261470').send(havocTicketReminder);
        client.channels.cache.get(globalVar.serverIDs.jcrTestingChannelID).send(havocTicketReminder);

        //log the event to jcrAggie server #phantom-ready channel
        client.channels.cache.get('605087450573963362').send("Bot issued cronHavoc reminder.");

        //log the event to the console
        console.log('---SENT CRONHAVOC'); 

    }, null, true, pHavTz); // central
    cronHavoc.start(); 
    console.log('---------SETTING UP CRON JOB FOR HAVOC TICKET REMINDER');
} // end sendHavocTicketReminder


function sendRogueTicketReminder(client, Discord) {
    // 581166616872747018 Phantom Rogue role ID (members)
    // 604386931178209310 PhantomRogue #ticket-warnings-ro channel
    var CronJob = require('cron').CronJob;

    var rogueTime = '0 30 19 * * *'; //ticket time is 20:30 CST, so reminder should be 19:30
    var pRogTz = 'America/Chicago';
    var cronRogue = new CronJob(rogueTime, function() {

        console.log('---SENDING ROGUE TICKET REMINDER');

        let ticketImage = new Discord.MessageAttachment('./graphics/TicketReminder01.png');
        
        var globalVar = require('../global.js');
        let rogueTicketReminder = globalVar.ticketEmbedTemp01
        
            .setTitle('phantomROGUE 600 TICKET REMINDER!')
            .attachFiles(ticketImage)
            .setImage('attachment://TicketReminder01.png')
            .setDescription("<@&581166616872747018> Tickets are due in 1 hour!")
        
        //send message to Havoc lounge
        client.channels.cache.get('604386931178209310').send(rogueTicketReminder);


        //log the event to jcrAggie server #phantom-ready channel
        client.channels.cache.get('605087450573963362').send("Bot issued cronRogue reminder.");

        //log the event to the console
        console.log('---SENT CRONROGUE'); 
        
    }, null, true, pRogTz); // central
    
    cronRogue.start();  
    console.log('---------SETTING UP CRON JOB FOR ROGUE TICKET REMINDER');
} // end sendRogueTicketReminder




//shows these functions to the outside world
module.exports = {
    startGetUpdatesCron,
    startSendUpdateEmbedsCron,
    wakeUpPhantomBot,
    sendHavocTicketReminder,
    sendRogueTicketReminder
    

};