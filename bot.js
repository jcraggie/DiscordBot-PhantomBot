const Discord = require('discord.js');
const client = new Discord.Client();
 
client.on('ready', () => {
    console.log('I am ready!');
});
 
//client.on('message', message => {
//    if (message.content === 'ping') {
//       message.reply('pong');
//       }
//});

client.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                client.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
			case 'pong':
                client.sendMessage({
                    to: channelID,
                    message: 'Ping!'
                });

            break;
            // Just add any case commands if you want to..
         }
     }
});
 
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN); //BOT_TOKEN is the Client Secret