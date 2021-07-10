module.exports = {
    name: 'log',
    description: "log text to console and discord log channel",
    async execute(client, message, args, Discord,swapi, ApiSwgohHelp){
        const globalVar = require ('../global.js');
        var fileUtils = require('../fileHelper.js');

        //log the event to Discord (jcrAggie server) and the console
        fileUtils.logToDiscordAndConsole(client, message, args, Discord);

        // CHECKING PERMISSIONS TO USE THIS COMMAND
        var permUtils = require('../helpers/permissions');
        var allowTheseRoles = [
            'Admin',
        ];
        if(!permUtils.hasPermission(client, message, Discord, allowTheseRoles)){
            var auth = message.author.username;
            msgDiscord = auth + ' does not have permission to run that command';
            msgConsole = msgDiscord;
            // log messages to both Discord log channel and Console
            fileUtils.logBotToDiscordAndConsole(client, message, args, Discord, msgDiscord, msgConsole);
            return;        
        } // end if does not have permission
        // otherwise...
        // permission is granted.... continue with command
        

        // END OF PERMISSION CHECK - CONTINUE WITH COMMAND
        var fullMsg = args.slice(0).join(' ');
        msgDiscord = '==========================\n' + fullMsg + '\n==========================';
        msgConsole = msgDiscord;
        // log messages to both Discord log channel and Console
        fileUtils.logBotToDiscordAndConsole(client, message, args, Discord, msgDiscord, msgConsole);
        
        


    }//end async execute

}//end module.exports