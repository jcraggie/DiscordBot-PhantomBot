module.exports = {
    name: 'tickets',
    description: "600 tickets reminder",
    async execute(client, message, args, Discord){
        if (args[0] == "help"){

            var globalVar = require('../global.js');
            var fileUtils = require('../helpers/fileHelper');
            let ticketsHelpEmbed = globalVar.phantomBotHelp
            .setTitle("PhantomBot Help")
            .setDescription("**COMMAND: **" + this.name)
            .addFields(                
                {name: 'DESCRIPTION', value: this.description},
                {name: 'USAGE', value: "`pb.tickets`"}
            )

            message.channel.send(ticketsHelpEmbed);
            ticketsHelpEmbed.fields=[] //clear the fields for the next use

            //log the event to Discord (jcrAggie server) and the console
            fileUtils.logToDiscordAndConsole(client, message, args, Discord);


        } else {
            
            let ticketImage = new Discord.MessageAttachment('./graphics/TicketReminder01.png');
            var globalVar = require('../global.js');
            let ticketsEmbed = globalVar.ticketEmbedTemp01

            .setTitle('600 TICKET REMINDER!')
            .attachFiles(ticketImage)
            .setImage('attachment://TicketReminder01.png')
            .setDescription("Your tickets are due soon!")
   
            message.channel.send(ticketsEmbed);
            ticketsEmbed.fields=[] //clear the fields for the next use

            //log the event to Discord (jcrAggie server) and the console
            fileUtils.logToDiscordAndConsole(client, message, args, Discord);


        } // end else
        

    }

}