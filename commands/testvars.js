module.exports = {
    name: 'testvars',
    description: "description of the new command",
    async execute(client, message, args, Discord,swapi, ApiSwgohHelp){
        const globalVar = require ('../global.js');
        var fileUtils = require('../fileHelper.js');
        message.channel.send('testvars');

        const value = 'value';
        eval('var ' + value + 1 + ' = ' + 123 + ';');

        console.log('value1 = ' + value1);


        const gNames = [
            'rebellion',
            'empire',
            'havoc',
            'rogue',
            'order',
            'uprising',
            'lotus',
            'phoundlings',
            'hope'
          ]; // end gNames


        var guild = {};
        var counter = 1;

        for (g of gNames) {
            guild[g] = counter;
            counter += 1;
        };

        for (g of gNames) {
            console.log('GUILD.'+g +' = ' + guild[g]);
        };
        //log the event to Discord (jcrAggie server) and the console
        fileUtils.logToDiscordAndConsole(client, message, args, Discord);


    }//end async execute

}//end module.exports