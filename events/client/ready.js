module.exports = (Discord,client) =>{
    console.log('---------PHANTOMBOT IS ONLINE!');
    console.log(`------------LOGGED IN AS: ${client.user.tag}`);
    var onReadyMemberCount = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
    console.log('---------TOTAL MEMBERS OF ALL SERVERS AT BOOT: ',onReadyMemberCount); // sends # of members
    client.channels.cache.get('605087450573963362').send('PhantomBot is online...' + onReadyMemberCount);

    //TODO move cron Havoc to cronJobs.js
    // HAVOC TICKET REMINDER 
    // 586379177331261470 Havoc #lounge  
    // 586291147169857556 PhantomHavoc role (members)

    var CronJob = require('cron').CronJob;
    cronUtils = require('../../helpers/cronJobs');    

    var havocTime = '0 30 17 * * *'
    var pHavTz = 'America/Chicago';

    var cronHavoc = new CronJob(havocTime, function() {

        console.log('---SENDING HAVOC TICKET REMINDER');

        let ticketImage = new Discord.MessageAttachment('./graphics/TicketReminder01.png');

        var globalVar = require('../../global.js');
        let havocTicketReminder = globalVar.ticketEmbedTemp01

                .setTitle('phantomHAVOC 600 TICKET REMINDER!')
                .attachFiles(ticketImage)
                .setImage('attachment://TicketReminder01.png')
                .setDescription("<@&586291147169857556> Tickets are due in 1 hour!")

                //send message to Havoc lounge
                client.channels.cache.get('586379177331261470').send(havocTicketReminder);


                //log the event to jcrAggie server #phantom-ready channel
                client.channels.cache.get('605087450573963362').send("Bot issued cronHavoc reminder.");

                //log the event to the console
                console.log('---SENT CRONHAVOC'); 

        }, null, true, pHavTz); // central
        cronHavoc.start();  //end cronHavoc



        //TODO move cron Rogue to cronJobs.js
        // 581166616872747018 Phantom Rogue role ID (members)
        // 604386931178209310 PhantomRogue #ticket-warnings-ro channel
        var rogueTime = '0 30 19 * * *'; //ticket time is 20:30 CST, so reminder should be 19:30
        var pRogTz = 'America/Chicago';
        var cronRogue = new CronJob(rogueTime, function() {

            console.log('---SENDING ROGUE TICKET REMINDER');
            
            let ticketImage = new Discord.MessageAttachment('./graphics/TicketReminder01.png');
            
            var globalVar = require('../../global.js');
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
    
        cronRogue.start();  //end cronRogue

        cronUtils.startGetUpdatesCron(client, Discord);
        cronUtils.startSendUpdateEmbedsCron(client, Discord);

} // end module.export

