module.exports = {
    name: 'help',
    description: "PhantomBot Commands",
    async execute(client, message, args, Discord, phantomBotHelp) {
        let testEmbed = phantomBotHelp
        
        .setColor(0x580202)
        .setDescription("**COMMAND PREFIX:**  `pb.`")
        .addFields(
            
            {name: '`invite`', value: 'creates temp invite to the Alliance server'},
            {name: '`recruit`', value: 'pastes link to the Recruiting server'},
            {name: '`newmember`', value: "assigns a new member to a guild"},
            {name: '\u200B', value: '\u200B' }
        )

        //.setFooter(phantomBotHelp.Footer);


        message.channel.send(testEmbed);



    }


}