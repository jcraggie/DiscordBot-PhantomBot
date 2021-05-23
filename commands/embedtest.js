module.exports = {
    name: 'embedtest',
    description: "command description goes here",
    async execute(client, message, args, Discord, phantomBotHelp) {
        let testEmbed = phantomBotHelp
        //.setTitle("PHANTOM BOT TEST EMBED")
        //.setColor(0xac30f1)
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



    }


}