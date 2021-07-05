module.exports = {
    name: 'testgetfcn',
    description: "description of the new command",
    async execute(client, message, args, Discord,swapi, ApiSwgohHelp){
        const globalVar = require ('../global.js');
        var fileUtils = require('../fileHelper.js');
        var fcn = require('./fcngetupdates.js');
        // message.channel.send('testupdatefcn');
        fcn.getGuildUpdates(client, message, args, Discord,swapi, ApiSwgohHelp);
        
        //log the event to Discord (jcrAggie server) and the console
        fileUtils.logToDiscordAndConsole(client, message, args, Discord);


    }//end async execute

}//end module.exports