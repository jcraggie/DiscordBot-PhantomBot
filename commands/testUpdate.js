module.exports = {
    name: 'testupdate',
    description: "description of the new command",
    async execute(client, message, args, Discord,swapi, ApiSwgohHelp){
        const globalVar = require ('../global.js');
        var fileUtils = require('../helpers/fileHelper');
        var mongoUtils = require('../helpers/mongoHelper');
        // message.channel.send('testupdatefcn');
        mongoUtils.testUpdate(client, message, args, Discord,swapi, ApiSwgohHelp);
        
        //log the event to Discord (jcrAggie server) and the console
        fileUtils.logToDiscordAndConsole(client, message, args, Discord);


    }//end async execute

}//end module.exports