module.exports = () =>{
    console.log('PhantomBot is online!');


// HAVOC TICKET REMINDER 
// 586379177331261470 Havoc #lounge  
// 586291147169857556 PhantomHavoc role (members)

var CronJob = require('cron').CronJob;
var havocTime = '0 30 18 * * *'
var pHavTz = 'America/Chicago';

var cronHavoc = new CronJob(havocTime, function() {

console.log('sending Havoc ticket reminder.');

let ticketImage = new Discord.MessageAttachment('./graphics/TicketReminder01.png');

var globalVar = require('../../global.js');
let havocTicketReminder = globalVar.phantomBotHelp

        .setTitle('phantomHAVOC 600 TICKET REMINDER!')
        .attachFiles(ticketImage)
        .setImage('attachment://TicketReminder01.png')
        .setDescription("<@&586291147169857556> Tickets are due in 1 hour!")

        //send message to Havoc lounge
        client.channels.cache.get('586379177331261470').send(havocTicketReminder);


        //log the event to jcrAggie server #phantom-ready channel
        client.channels.cache.get('605087450573963362').send("Bot issued cronHavoc reminder.");

        //log the event to the console
        console.log('Bot sent cronHavoc'); 

    }, null, true, pHavTz); // central

    cronHavoc.start();





}

