module.exports = {
    name: 'serverstats',
    description: 'counts members',
    async execute(client, message, args, Discord) {
        let isRestricted = true;
        let isTesting = true;

        let globalVar = require('../global.js');

        if(isRestricted) {
            if(message.author.id !== globalVar.discord_jcrAggie && message.author.id !== globalVar.discord_jcraggie93) {
                message.channel.send (globalVar.not_auth_msg);
                return;
            };
        }   

        var guildID = message.guild;
        var guildName = guildID.toString().toUpperCase();
        var memberCount = 0;

        memberCount = guildID.members.cache.filter(member => !member.user.bot).size;  
        botCount = guildID.members.cache.filter(member => member.user.bot).size;
        totalCount =guildID.members.cache.size;
        
        let statsEmbed = globalVar.phantomBotHelp
                .setTitle(`${guildName} STATS`)
                .setDescription(" ")
                .addFields(                
                    {name: 'MEMBERS', value: memberCount, inline: true},
                    {name: 'BOTS', value: botCount, inline: true},
                    {name: 'TOTAL', value: totalCount, inline: true},
                    {name: '\u200B', value: '\u200B' }
            
                    ) // end addFields
        message.channel.send(statsEmbed);
        statsEmbed.fields = [];

        //log the event to Discord (jcrAggie server) and the console
        fileUtils.logToDiscordAndConsole(client, message, args, Discord);

    } // end async execute
} //end module exports