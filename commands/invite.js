module.exports = {
    name: 'invite',
    description: "Creates a temporary link to the PhantomAlliance main server and pastes it below.",
    async execute(client, message, args, Discord){
        if (args[0] == "help"){
            //message.channel.send('HELP for ` -invite ` is not implemented yet. This is the way.');

            var globalVar = require('../global.js');
            var fileUtils = require('../fileHelper.js');
            let inviteHelpEmbed = globalVar.phantomBotHelp
            .setTitle("PhantomBot Help")
            .setDescription("**COMMAND: **" + this.name)
            .addFields(                
                {name: 'DESCRIPTION', value: this.description},
                {name: 'USAGE', value: "`pb.invite #hours #uses`"},
                {name: 'EXAMPLE', value: "`pb.invite 3 4` = invite for 3 hrs and/or 4 uses"},
                {name: 'DEFAULT', value: "`pb.invite` defaults to 1 hr and/or 1 use"},
                {name: '\u200B', value: '\u200B' }
            )
    
            //.setFooter(phantomBotHelp.Footer);
            
            
            
            message.channel.send(inviteHelpEmbed);
            inviteHelpEmbed.fields=[] //clear the fields for the next use

            //log the event to Discord (jcrAggie server) and the console
            fileUtils.logToDiscordAndConsole(client, message, args, Discord);


        } else {

            //log the event to Discord (jcrAggie server) and the console
            console.log('---CLIENT: ', client);
            console.log('---MESSAGE: ', message.content);
            console.log('--- PB.INVITE ARGS: ', args);
            console.log('---DISCORD: ', Discord);
            // fileUtils.logToDiscordAndConsole(client, message, args, Discord);
            //log the event to Discord (jcrAggie server) and the console
               fileUtils.logToDiscordAndConsole(client, message, args, Discord);

            //message.channel.send('https://discord.gg/rUUpTRC');
            var inviteAge = args[0] * 3600;
            var inviteUses = args[1];

            if(inviteAge == undefined || isNaN(inviteAge)) inviteAge = 3600;
            if(inviteUses == undefined) inviteUses = 1;

            var inviteOptions = {
                maxAge: inviteAge,
                maxUses: inviteUses,
                unique: true
            };

            
            
            var invite = client.channels.cache.get("483433483109138435").createInvite(inviteOptions).then(function(newInvite){
                message.channel.send("https://discord.gg/" + newInvite.code);
                message.channel.send("**Duration: ** " + inviteAge/3600 + " hrs    Uses: " + inviteUses);


                
            });


        } // end else
        

    }

}