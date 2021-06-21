module.exports = (Discord,client) =>{
    console.log('PhantomBot is online!');
    console.log(client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)); // sends # of members
    client.channels.cache.get('605087450573963362').send('PhantomBot is online...');

    // this code works. Just need a job to try it out on.    
    var CronJob = require('cron').CronJob;
    // var cronTime = '0 21 22 * * *'
    // var pRebTz = 'America/New_York';
    pRebTz = 'America/Chicago';
    var cronTest = new CronJob('1 * * * * *', function() {
    
    console.log('cron 1 min test. Tz: '+pRebTz);
    client.channels.cache.get('605087450573963362').send("cron every minute from PhantomBot. Timezone: "+pRebTz);

  
  }, null, true, pRebTz); // eastern
cronTest.start();







// HAVOC TICKET REMINDER 
// 586379177331261470 Havoc #lounge  
// 586291147169857556 PhantomHavoc role (members)

var CronJob = require('cron').CronJob;


var havocTime = '0 30 17 * * *'
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

    cronHavoc.start();  //end cronHavoc

    // 581166616872747018 Phantom Rogue role ID (members)
    // 604386931178209310 PhantomRogue #ticket-warnings-ro channel
    var rogueTime = '0 30 19 * * *'; //ticket time is 20:30 CST, so reminder should be 19:30
    var pRogTz = 'America/Chicago';
    var cronRogue = new CronJob(rogueTime, function() {

        console.log('sending Rogue ticket reminder.');
        
        let ticketImage = new Discord.MessageAttachment('./graphics/TicketReminder01.png');
        
        var globalVar = require('../../global.js');
        let rogueTicketReminder = globalVar.phantomBotHelp
        
                .setTitle('phantomROGUE 600 TICKET REMINDER!')
                .attachFiles(ticketImage)
                .setImage('attachment://TicketReminder01.png')
                .setDescription("<@&581166616872747018> Tickets are due in 1 hour!")
        
                //send message to Havoc lounge
                client.channels.cache.get('604386931178209310').send(rogueTicketReminder);
        
        
                //log the event to jcrAggie server #phantom-ready channel
                client.channels.cache.get('605087450573963362').send("Bot issued cronRogue reminder.");
        
                //log the event to the console
                console.log('Bot sent cronRogue'); 
        
            }, null, true, pRogTz); // central
        
            cronRogue.start();  //end cronHavoc



}

