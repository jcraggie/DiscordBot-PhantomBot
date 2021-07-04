module.exports = {
    name: 'currepoch',
    description: "description of the new command",
    async execute(client, message, args, Discord,swapi, ApiSwgohHelp){
        const globalVar = require ('../global.js');
        var fileUtils = require('../fileHelper.js');
        // message.channel.send('currepoch');

        var currEpoch = Math.floor(new Date().getTime())
        console.log('---current time epoch', currEpoch)
        message.channel.send('EPOCH TIME: ',currEpoch);

        var fetchDateConvert = new Date(currEpoch - (18000 * 1000)); //convert epoch timestamp to date and time
        var fetchLocalDate = fetchDateConvert.toLocaleString(); //convert date and time to local

        console.log('---current time Text: ', fetchLocalDate);
        message.channel.send('CONVERT: ', fetchLocalDate);
        
        //log the event to Discord (jcrAggie server) and the console
        fileUtils.logToDiscordAndConsole(client, message, args, Discord);


    }//end async execute

}//end module.exports