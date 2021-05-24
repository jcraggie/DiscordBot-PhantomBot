module.exports = {
    name: 'recruit',
    description: "Pastes a link to the PhantomAlliance recruiting server.",
    async execute(client, message, args, Discord, phantomBotHelp){
        if (args[0] == "help"){
            let helpEmbed = phantomBotHelp
            //.setTitle("PHANTOM BOT TEST EMBED")
            //.setColor(0xac30f1)
            .setDescription("**COMMAND: **" + this.name)
            .addFields(
                {name: 'DESCRIPTION', value: this.description},
                {name: 'USAGE', value: "`pb.recruit`"},
                {name: '\u200B', value: '\u200B' }
            )
    
            //.setFooter(phantomBotHelp.Footer);
    
    
            message.channel.send(helpEmbed);


            //message.channel.send('Just type ` -recruit `.   **This is the way.**');

        } else
        message.channel.send('https://discord.gg/rUUpTRC');

        //log the event
        client.channels.cache.get('605087450573963362').send(message.author.username + " used RECRUIT command.");

    }

}