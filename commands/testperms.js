module.exports = {
    name: 'testperms',
    description: "description of the new command",
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
        message.channel.send('testperms');

        // END OF PERMISSION CHECK - CONTINUE WITH COMMAND
        

        // return the current time

        //log the event to Discord (jcrAggie server) and the console
        fileUtils.logToDiscordAndConsole(client, message, args, Discord);


    }//end async execute

}//end module.exports