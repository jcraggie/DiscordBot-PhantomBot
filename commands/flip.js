module.exports = {
    name: 'flip',
    description: "description of the new command",
    async execute(client, message, args, Discord,swapi, ApiSwgohHelp){
        const globalVar = require ('../global.js');
        var fileUtils = require('../fileHelper.js');

        //log the event to Discord (jcrAggie server) and the console
        fileUtils.logToDiscordAndConsole(client, message, args, Discord)

        // EVERYONE HAS PERMISSION TO RUN THIS COMMAND

        function doRandHT() {
            var rand = ['**HEADS!**','**TAILS!**'];
            
            return rand[Math.floor(Math.random()*rand.length)];
        }

            let flipEmbed = globalVar.phantomBotHelp
                .setTitle("The PHANTOMBOT says...")
                .setDescription(doRandHT())
            message.channel.send(flipEmbed);
        // message.channel.send('newcommandshell');
        
        ;


    }//end async execute

}//end module.exports