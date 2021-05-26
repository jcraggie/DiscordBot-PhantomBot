module.exports = {
    name: 'recruit',
    description: "Pastes a link to the PhantomAlliance recruiting server.",
    async execute(client, message, args, Discord){
        if (args[0] == "help"){
            var globalVar = require('../global.js');
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

            //log the event to jcrAggie server #phantom-ready channel
            client.channels.cache.get('605087450573963362').send(message.author.username + " used RECRUIT HELP command.");
            
            //log the event to the console
            console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);

        } else {
            message.channel.send('https://discord.gg/rUUpTRC');
            
            //log the event to jcrAggie server #phantom-ready channel
            client.channels.cache.get('605087450573963362').send(message.author.username + " used RECRUIT command.");
            
            //log the event to the console
            console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);

        }
        

    }

}