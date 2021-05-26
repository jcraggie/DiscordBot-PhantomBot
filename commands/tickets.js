module.exports = {
    name: 'tickets',
    description: "600 tickets reminder",
    async execute(client, message, args, Discord, phantomBotHelp){
        if (args[0] == "help"){
            //message.channel.send('HELP for ` -invite ` is not implemented yet. This is the way.');
            let helpEmbed = phantomBotHelp
            
            //.setColor(0xac30f1)
            .setDescription("**COMMAND: **" + this.name)
            .addFields(                
                {name: 'DESCRIPTION', value: this.description},
                {name: 'USAGE', value: "`pb.tickets`"}
                
                
            )

            message.channel.send(helpEmbed);


        } else {
            
            let ticketImage = new Discord.MessageAttachment('./graphics/TicketReminder01.png');
            let ticketReminder = phantomBotHelp
            .setTitle('600 TICKET REMINDER!')
            //.setColor(0xac30f1)
            .attachFiles(ticketImage)
            .setImage('attachment://TicketReminder01.png')
            .setDescription("Tickets are due in 1 hour!")
            // .addFields(                
            //     {name: 'PLAYER NAME', value: memName},
            //     {name: 'GUILD', value: memGuild},
            //     {name: 'DISCORD NAME', value: memNewNick}
                
            // )
    
            //.setFooter(phantomBotHelp.Footer);
    
    
            message.channel.send(ticketReminder);

            //log the event
            client.channels.cache.get('605087450573963362').send(message.author.username + " used TICKETS command.");
            console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);  


        } // end else
        

    }

}