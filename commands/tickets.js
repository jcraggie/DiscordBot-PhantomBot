module.exports = {
    name: 'tickets',
    description: "600 tickets reminder",
    async execute(client, message, args, Discord){
        if (args[0] == "help"){

            var globalVar = require('../global.js');
            let ticketsHelpEmbed = globalVar.phantomBotHelp
            .setTitle("PhantomBot Help")
            .setDescription("**COMMAND: **" + this.name)
            .addFields(                
                {name: 'DESCRIPTION', value: this.description},
                {name: 'USAGE', value: "`pb.tickets`"}
            )

            message.channel.send(ticketsHelpEmbed);
            ticketsHelpEmbed.fields=[] //clear the fields for the next use

            //log the event to jcrAggie server #phantom-ready channel
            client.channels.cache.get('605087450573963362').send(message.author.username + " used TICKETS HELP command.");
            
            //log the event to the console
            console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);


        } else {
            
            let ticketImage = new Discord.MessageAttachment('./graphics/TicketReminder01.png');
            var globalVar = require('../global.js');
            let ticketsEmbed = globalVar.ticketEmbedTemp01

            .setTitle('600 TICKET REMINDER!')
            .attachFiles(ticketImage)
            .setImage('attachment://TicketReminder01.png')
            .setDescription("Tickets are due in 1 hour!")
   
            message.channel.send(ticketsEmbed);
            ticketsEmbed.fields=[] //clear the fields for the next use

            //log the event to jcrAggie server #phantom-ready channel
            client.channels.cache.get('605087450573963362').send(message.author.username + " used TICKETS command.");
            
            //log the event to the console
            console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);  


        } // end else
        

    }

}