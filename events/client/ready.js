module.exports = () =>{
    console.log('PhantomBot is online!');
}

// HAVOC TICKET REMINDER 
// 586379177331261470 Havoc #lounge  
// 586291147169857556 PhantomHavoc role (members)
var CronJob = require('cron').CronJob;
var havocTime = '0 30 18 * * *'
var pHavTz = 'America/Chicago';

var cronHavoc = new CronJob('1 * * * * *', function() {

console.log('sending Havoc ticket reminder.');

let ticketImage = new Discord.MessageAttachment('./graphics/TicketReminder01.png');
let havocTicketReminder = phantomBotHelp
.setTitle('phantomHAVOC 600 TICKET REMINDER!')
//.setColor(0xac30f1)
.attachFiles(ticketImage)
.setImage('attachment://TicketReminder01.png')
.setDescription("<@&586291147169857556> Tickets are due in 1 hour!")
// .addFields(                
//     {name: 'PLAYER NAME', value: memName},
//     {name: 'GUILD', value: memGuild},
//     {name: 'DISCORD NAME', value: memNewNick}
    
// )

//.setFooter(phantomBotHelp.Footer);


message.channel.send(havocTicketReminder);

//log the event
client.channels.cache.get('605087450573963362').send(message.author.username + " used TICKETS command.");
console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`); 



client.channels.cache.get('586379177331261470').send("cron every minute from bot. Timezone: "+pHavTz);


}, null, true, pHavTz); // eastern
cronTest.start();