module.exports = {
    name: 'getguild',
    description: "reads in the specified guild json file\nthis data is stored locally",
    async execute(client, message, args, Discord,swapi, ApiSwgohHelp){
        function sendGetGuildHelp() {
            var globalVar = require('../global.js');
            var fileUtils = require('../fileHelper.js');
            let getguildHelp = globalVar.phantomBotHelp
            .setTitle("PhantomBot Help")
            .setDescription("**COMMAND: **" + '`' + module.exports.name + '`')
            .addFields(                
                {name: 'DESCRIPTION', value: module.exports.description},
                {name: 'USAGE', value: "`pb.getguild guild_name`"},
                {name: 'EXAMPLE', value: "`pb.getguild rebellion`"},
                {name: '\u200B', value: '\u200B' }
                
            )
            message.channel.send(getguildHelp);
            getguildHelp.fields=[] //clear the fields for the next use
  
        } // end function sendNewMemberHelp
        if (args[0] == "help"){
            sendGetGuildHelp();

            //log the event to Discord (jcrAggie server) and the console
            fileUtils.logToDiscordAndConsole(client, message, args, Discord);

        } else {

              var guildFileName = false;

              switch(args[0]) {
                    case 'rebellion' :
                        guildFileName = globalVar.rebellionInfo.guildJSON;
                        break;
                    case 'empire' :
                        guildFileName = globalVar.empireInfo.guildJSON;
                        break;
                    case 'havoc' :
                        guildFileName = globalVar.havocInfo.guildJSON;
                        break;
                    case 'rogue' :
                        guildFileName = globalVar.rogueInfo.guildJSON;
                        break;
                    case 'order' :
                        guildFileName = globalVar.orderInfo.guildJSON;
                        break;
                    case 'uprising' :
                        guildFileName = globalVar.uprisingInfo.guildJSON;
                        break;
                    case 'lotus' :
                        guildFileName = globalVar.lotusInfo.guildJSON;
                        break;
                    case 'phoundlings' :
                        guildFileName = globalVar.phoundlingsInfo.guildJSON;
                        break;
                    case "hope":
                        guildFileName = globalVar.hopeInfo.guildJSON;
                        break;
                    default:
                        message.channel.send('Cannot find that guild.');
                        return;
                }//end switch

                const guildFilePath = './guilds/';
                const guildList = [];

                const guildToRead = guildFilePath + guildFileName;

                const fs = require('fs');
                
                fs.readFile(guildToRead, 'utf8', (err, jsonString) => {
                    if (err) {
                        console.log('---FILE READ FAILED: ', err);
                        return;
                    }

                    try {
                        const guildData = JSON.parse(jsonString); //change JSON file to an object
                        console.log(guildData.name, ': ', guildData.members, '  GP: ', guildData.gp, ' Updated: ',guildData.updated);

                        var dateConvert = new Date(guildData.updated + 1000); //convert epoch timestamp to date and time
                        var localDate = dateConvert.toLocaleString(); //convert date and time to local
                        var localGP = guildData.gp.toLocaleString("en-US"); //add commas to GP

                        // var globalVar = require('../global.js');
                        let guildEmbed = globalVar.phantomBotHelp
                        .setTitle("THE PHANTOM ALLIANCE GUILD INFO")
                        .setDescription(" ")
                        .addFields(
                            {name: guildData.name, value: 'MEMBERS: `' + guildData.members + '` GP: `'+ localGP + '`\nUpdated: `' + localDate + '`'},
                            {name: '\u200B', value: '\u200B' }
                        ) //end .addFields

                        message.channel.send(guildEmbed);
                        guildEmbed.fields=[] //clear the fields for the next use

                        //log the event to Discord (jcrAggie server) and the console
                        fileUtils.logToDiscordAndConsole(client, message, args, Discord);

                    }//end try 
                    catch (err) {
                        console.log('---ERROR PARSING JSON STRING: ', err);

                    }//end catch
                
                })//end fs.readFile
            } // end else
    }//end async execute

}//end module.exports