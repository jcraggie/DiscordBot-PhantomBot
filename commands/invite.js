module.exports = {
    name: 'invite',
    description: "Creates a temporary link to the PhantomAlliance main server and pastes it below.",
    async execute(client, message, args, Discord, phantomBotHelp){
        if (args[0] == "help"){
            //message.channel.send('HELP for ` -invite ` is not implemented yet. This is the way.');
            let helpEmbed = phantomBotHelp
            //.setTitle("PHANTOM BOT TEST EMBED")
            .setColor(0xac30f1)
            .setDescription("**COMMAND: **" + this.name)
            .addFields(                
                {name: 'DESCRIPTION', value: this.description},
                {name: 'USAGE', value: "`pb.invite #hours #uses`"},
                {name: 'EXAMPLE', value: "`pb.invite 3 4` = invite for 3 hrs and/or 4 uses"},
                {name: 'DEFAULT', value: "`pb.invite` defaults to 1 hr and/or 1 use"},
                {name: '\u200B', value: '\u200B' }
            )
    
            //.setFooter(phantomBotHelp.Footer);
    
    
            message.channel.send(helpEmbed);


        } else {
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


        }
        

    }

}