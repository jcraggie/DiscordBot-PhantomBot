module.exports = {
    name: 'help',
    description: "PhantomBot Commands",
    async execute(client, message, args, Discord) {
        var globalVar = require('../global.js');
        var fileUtils = require('../fileHelper.js');
        let helpEmbed = globalVar.phantomBotHelp
        .setTitle("PhantomBot Help")
        //.setColor(0xac30f1)
        .setDescription("**COMMAND PREFIX:**  `pb.`")
        .addFields(
            
            {name: '`invite`', value: 'creates temp invite to the Alliance server'},
            {name: '`recruit`', value: 'pastes link to the Recruiting server'},
            {name: '`newmember`', value: "assigns a new member to a guild"},
            {name: '`stats`', value: 'shows some stats about you or this server'},
            {name: '`tickets`', value: 'a generic tickets reminder'},
            {name: '`getguild`', value: 'reads the local guild data file'},
            {name: '`flip`', value: 'heads or tails!'},
            {name: '\u200B', value: '\u200B' }
        )

        //.setFooter(phantomBotHelp.Footer);

        // let guild = client.guilds.cache.get('serverID');
        // let member = guild.member(message.author);
        // let nickname = member ? member.displayName : null;

        
        message.channel.send(helpEmbed);
        helpEmbed.fields=[] //clear the fields for the next use

        //log the event to Discord (jcrAggie server) and the console
        fileUtils.logToDiscordAndConsole(client, message, args, Discord);


    }


}