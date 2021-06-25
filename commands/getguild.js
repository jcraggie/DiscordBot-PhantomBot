module.exports = {
    name: 'getguild',
    description: "reads in the specified guild json file\nthis data is stored locally",
    async execute(client, message, args, Discord,swapi, ApiSwgohHelp){
        function sendGetGuildHelp() {
            var globalVar = require('../global.js');
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
  
              //log the event to jcrAggie server #phantom-ready channel
              let msg = '`' + message.author.username + '` in #`'+ message.channel.name + '` sent: `' + message.content +'`';
              client.channels.cache.get('605087450573963362').send(msg);
              
              //log the event to the console
              console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);
  
          } else {

              var guildFileName = false;

                switch(args[0]) {
                    case 'rebellion' :
                        guildFileName = 'g_01_rebellion.json';
                        console.log('---SWITCH: Rebellion\'s file.');
                        //guildCompleteFileName = guildFilePath + guildFileName;
                        break;
                    case 'empire' :
                        guildFileName = 'g_02_empire.json';
                        console.log('---SWITCH: Empire\'s file.');
                        //guildCompleteFileName = guildFilePath + guildFileName;
                        break;
                    case 'havoc' :
                        guildFileName = 'g_03_havoc.json';
                        console.log('---SWITCH: Havoc\'s file.');
                        //guildCompleteFileName = guildFilePath + guildFileName;
                        break;
                    case 'rogue' :
                        guildFileName = 'g_04_rogue.json';
                        console.log('---SWITCH: Rogue\'s file.');
                        //guildCompleteFileName = guildFilePath + guildFileName;
                        break;
                    case 'order' :
                        guildFileName = 'g_05_order.json';
                        console.log('---SWITCH: Order\'s file.');
                        //guildCompleteFileName = guildFilePath + guildFileName;
                        break;
                    case 'uprising' :
                        guildFileName = 'g_06_uprising.json';
                        console.log('---SWITCH: Uprising\'s file.');
                        //guildCompleteFileName = guildFilePath + guildFileName;
                        break;
                    case 'lotus' :
                        guildFileName = 'g_07_lotus.json';
                        console.log('---SWITCH: Lotus\' file.');
                        //guildCompleteFileName = guildFilePath + guildFileName;
                        break;
                    case 'phoundlings' :
                        guildFileName = 'g_08_phoundlings.json';
                        console.log('---SWITCH: Phoundlings\' file.');
                        //guildCompleteFileName = guildFilePath + guildFileName;
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

                        var globalVar = require('../global.js');
                        let guildEmbed = globalVar.phantomBotHelp
                        .setTitle("THE PHANTOM ALLIANCE GUILD INFO")
                        .setDescription(" ")
                        .addFields(
                            {name: guildData.name, value: 'MEMBERS: `' + guildData.members + '` GP: `'+ localGP + '`\nUpdated: `' + localDate + '`'},
                            {name: '\u200B', value: '\u200B' }
                        ) //end .addFields

                        message.channel.send(guildEmbed);
                        guildEmbed.fields=[] //clear the fields for the next use

                        //log the event to jcrAggie server #phantom-ready channel
                        let msg = '`' + message.author.username + '` in #`'+ message.channel.name + '` sent: `' + message.content +'`';
                        client.channels.cache.get('605087450573963362').send(msg);
                        
                        //log the event to the console
                        console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);

                    }//end try 
                    catch (err) {
                        console.log('---ERROR PARSING JSON STRING: ', err);

                    }//end catch
                
                })//end fs.readFile
            } // end else
    }//end async execute

}//end module.exports