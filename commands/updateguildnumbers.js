module.exports = {
    name: 'updateguildnumbers',
    description: "description of the new command",
    async execute(client, message, args, Discord,swapi, ApiSwgohHelp){
        const globalVar = require ('../global.js');
        var fileUtils = require('../helpers/fileHelper');

        //log the event to Discord (jcrAggie server) and the console
        fileUtils.logToDiscordAndConsole(client, message, args, Discord);

        // only jcraggie and jcrAggieJedi can run commands
        // if(message.author.id !== "116901947428044809" && message.author.id !== "419494570213244939") {
        //     message.channel.send ("Sorry. You are not jcrAggie or jcrAggieJedi. **This is the way.**");
        //     return;
        // };
        
        // only jcrAggie can run commands
        if(message.author.id !== "116901947428044809") {
            message.channel.send ("Sorry. You are not jcrAggie. **This is the way.**");
            return;
        };

        var mongoUtils = require('../helpers/mongoHelper');
        // message.channel.send('testupdatefcn');
        mongoUtils.updateGuildEmbeds(client, message, args, Discord,swapi, ApiSwgohHelp);
        
        


    }//end async execute

}//end module.exports