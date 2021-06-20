module.exports = {
    name: 'help',
    description: "PhantomBot Commands",
    async execute(client, message, args, Discord) {
        var globalVar = require('../global.js');
        let helpEmbed = globalVar.phantomBotHelp
        .setTitle("PhantomBot Help")
        //.setColor(0xac30f1)
        .setDescription("**COMMAND PREFIX:**  `pb.`")
        .addFields(
            
            {name: '`invite`', value: 'creates temp invite to the Alliance server'},
            {name: '`recruit`', value: 'pastes link to the Recruiting server'},
            {name: '`newmember`', value: "assigns a new member to a guild"},
            {name: '`serverstats`', value: 'shows # of members and bots in this server'},
            {name: '`tickets`', value: 'a generic tickets reminder'},
            {name: '\u200B', value: '\u200B' }
        )

        //.setFooter(phantomBotHelp.Footer);

        // let guild = client.guilds.cache.get('serverID');
        // let member = guild.member(message.author);
        // let nickname = member ? member.displayName : null;

        
        message.channel.send(helpEmbed);
        helpEmbed.fields=[] //clear the fields for the next use

        //log the event to jcrAggie server #phantom-ready channel
        let msg = '`' + message.author.username + '` in #`'+ message.channel.name + '` sent: `' + message.content +'`';
        client.channels.cache.get('605087450573963362').send(msg);
        
        //log the event to the console
        console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);


    }


}