module.exports = {
    name: 'embedtest',
    description: "command description goes here",
    async execute(client, message, args, Discord) {

        var globalVar = require('../global.js');
        let testEmbed = globalVar.phantomBotHelp
        .setTitle("PhantomBot EmbedTest")
        .setDescription("**COMMAND: **" + this.description)
        .addFields(
            {name: 'DESCRIPTION', value: this.description},
            {name: 'USAGE', value: "command usage goes here"},
            {name: 'EXAMPLE', value: "command examples goes here"},
            {name: 'DEFAULT', value: "command default goes here"},
            {name: '\u200B', value: '\u200B' }
        )

        //.setFooter(phantomBotHelp.Footer);


        message.channel.send(testEmbed);
        testEmbed.fields=[] //clear the fields for the next use

        //log the event to jcrAggie server #phantom-ready channel
        let msg = '`' + message.author.username + '` in #`'+ message.channel.name + '` sent: `' + message.content +'`';
        client.channels.cache.get('605087450573963362').send(msg);
        
        //log the event to the console
        console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);



    }


}