module.exports = {
    name: 'recruit',
    description: "Pastes a link to the PhantomAlliance recruiting server.",
    async execute(client, message, args, Discord){
        if (args[0] == "help"){
            var globalVar = require('../global.js');
            var fileUtils = require('../helpers/fileHelper');

            // EVERYONE HAS PERMISSION TO RUN THIS COMMAND

            //log the event to Discord (jcrAggie server) and the console
            fileUtils.logToDiscordAndConsole(client, message, args, Discord);

            let recruitHelpEmbed = globalVar.phantomBotHelp
            .setTitle("PhantomBot Help")
            .setDescription("**COMMAND: **" + this.name)
            .addFields(
                {name: 'DESCRIPTION', value: this.description},
                {name: 'USAGE', value: "`pb.recruit`"},
                {name: '\u200B', value: '\u200B' }
            )

            message.channel.send(recruitHelpEmbed);
            recruitHelpEmbed.fields=[] //clear the fields for the next use

            //log the event to Discord (jcrAggie server) and the console
            fileUtils.logToDiscordAndConsole(client, message, args, Discord);

        } else {
            message.channel.send('https://discord.gg/rUUpTRC');
            
            

        }
        

    }

}