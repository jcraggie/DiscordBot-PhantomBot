module.exports = {
    name: 'newcommandshell',
    description: "description of the new command",
    async execute(client, message, args, Discord,swapi, ApiSwgohHelp){
        const globalVar = require ('../global.js');
        var fileUtils = require('../fileHelper.js');
        message.channel.send('newcommandshell');
        
        //log the event to Discord (jcrAggie server) and the console
        fileUtils.logToDiscordAndConsole(client, message, args, Discord);


    }//end async execute

}//end module.exports