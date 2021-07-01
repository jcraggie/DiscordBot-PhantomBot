module.exports = {
    name: 'getguild',
    description: "reads in the specified guild json file\nthis data is stored locally",
    async execute(client, message, args, Discord,swapi, ApiSwgohHelp){
        var globalVar = require('../global.js');
        var fileUtils = require('../fileHelper.js');

        function sendGetGuildHelp() {
            // var globalVar = require('../global.js');
            // var fileUtils = require('../fileHelper.js');
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
  
         } // end function sendGetGuildHelp
         
          if (args[0] == "help"){
              sendGetGuildHelp();
  
              //log the event to Discord (jcrAggie server) and the console
              fileUtils.logToDiscordAndConsole(client, message, args, Discord);
  
          } else {

              var guildFileName = false;

              switch(args[0]) {
                case 'rebellion' :
                    guildFileName = globalVar.rebellionInfo.guildJSON;
                    leader = globalVar.rebellionInfo.leader;
                    dailyTickets = globalVar.rebellionInfo.dailyTickets;
                    ticketReset = globalVar.rebellionInfo.dailyTickets;
                    hothDS = globalVar.rebellionInfo.hothDS;
                    hothLS = globalVar.rebellionInfo.hothLS;
                    geoDS = globalVar.rebellionInfo.geoDS;
                    watShards = globalVar.rebellionInfo.watShards;
                    geoLS = globalVar.rebellionInfo.geoLS;
                    kamShards = globalVar.rebellionInfo.kamShards;
                    haat = globalVar.rebellionInfo.haat;
                    hpit = globalVar.rebellionInfo.hpit;
                    hstr = globalVar.rebellionInfo.hstr;
                    cpit = globalVar.rebellionInfo.cpit;
                    guildGG = globalVar.rebellionInfo.guildGG;
                    mainServerChannelID = globalVar.rebellionInfo.mainServerChannelID;
                    mainServerMsgID = globalVar.rebellionInfo.mainServerMsgID;
                    recruitingServerChannelID = globalVar.rebellionInfo.recruitingServerChannelID;
                    recruitingServerMsgID = globalVar.rebellionInfo.recruitingServerMsgID;
                    jcrServerChannelID = globalVar.rebellionInfo.jcrServerChannelID;
                    jcrServerMsgID = globalVar.rebellionInfo.jcrServerMsgID;
                    
                    break;
                case 'empire' :
                    guildFileName = globalVar.empireInfo.guildJSON;
                    leader = globalVar.empireInfo.leader;
                    dailyTickets = globalVar.empireInfo.dailyTickets;
                    ticketReset = globalVar.empireInfo.dailyTickets;
                    hothDS = globalVar.empireInfo.hothDS;
                    hothLS = globalVar.empireInfo.hothLS;
                    geoDS = globalVar.empireInfo.geoDS;
                    watShards = globalVar.empireInfo.watShards;
                    geoLS = globalVar.empireInfo.geoLS;
                    kamShards = globalVar.empireInfo.kamShards;
                    haat = globalVar.empireInfo.haat;
                    hpit = globalVar.empireInfo.hpit;
                    hstr = globalVar.empireInfo.hstr;
                    cpit = globalVar.empireInfo.cpit;
                    guildGG = globalVar.empireInfo.guildGG;
                    mainServerChannelID = globalVar.empireInfo.mainServerChannelID;
                    mainServerMsgID = globalVar.empireInfo.mainServerMsgID;
                    recruitingServerChannelID = globalVar.empireInfo.recruitingServerChannelID;
                    recruitingServerMsgID = globalVar.empireInfo.recruitingServerMsgID;
                    jcrServerChannelID = globalVar.empireInfo.jcrServerChannelID;
                    jcrServerMsgID = globalVar.empireInfo.jcrServerMsgID;
                    break;
                case 'havoc' :
                    guildFileName = globalVar.havocInfo.guildJSON;
                    leader = globalVar.havocInfo.leader;
                    dailyTickets = globalVar.havocInfo.dailyTickets;
                    ticketReset = globalVar.havocInfo.dailyTickets;
                    hothDS = globalVar.havocInfo.hothDS;
                    hothLS = globalVar.havocInfo.hothLS;
                    geoDS = globalVar.havocInfo.geoDS;
                    watShards = globalVar.havocInfo.watShards;
                    geoLS = globalVar.havocInfo.geoLS;
                    kamShards = globalVar.havocInfo.kamShards;
                    haat = globalVar.havocInfo.haat;
                    hpit = globalVar.havocInfo.hpit;
                    hstr = globalVar.havocInfo.hstr;
                    cpit = globalVar.havocInfo.cpit;
                    guildGG = globalVar.havocInfo.guildGG;
                    mainServerChannelID = globalVar.havocInfo.mainServerChannelID;
                    mainServerMsgID = globalVar.havocInfo.mainServerMsgID;
                    recruitingServerChannelID = globalVar.havocInfo.recruitingServerChannelID;
                    recruitingServerMsgID = globalVar.havocInfo.recruitingServerMsgID;
                    jcrServerChannelID = globalVar.havocInfo.jcrServerChannelID;
                    jcrServerMsgID = globalVar.havocInfo.jcrServerMsgID;
                    break;
                case 'rogue' :
                    guildFileName = globalVar.rogueInfo.guildJSON;
                    leader = globalVar.rogueInfo.leader;
                    dailyTickets = globalVar.rogueInfo.dailyTickets;
                    ticketReset = globalVar.rogueInfo.dailyTickets;
                    hothDS = globalVar.rogueInfo.hothDS;
                    hothLS = globalVar.rogueInfo.hothLS;
                    geoDS = globalVar.rogueInfo.geoDS;
                    watShards = globalVar.rogueInfo.watShards;
                    geoLS = globalVar.rogueInfo.geoLS;
                    kamShards = globalVar.rogueInfo.kamShards;
                    haat = globalVar.rogueInfo.haat;
                    hpit = globalVar.rogueInfo.hpit;
                    hstr = globalVar.rogueInfo.hstr;
                    cpit = globalVar.rogueInfo.cpit;
                    guildGG = globalVar.rogueInfo.guildGG;
                    mainServerChannelID = globalVar.rogueInfo.mainServerChannelID;
                    mainServerMsgID = globalVar.rogueInfo.mainServerMsgID;
                    recruitingServerChannelID = globalVar.rogueInfo.recruitingServerChannelID;
                    recruitingServerMsgID = globalVar.rogueInfo.recruitingServerMsgID;
                    jcrServerChannelID = globalVar.rogueInfo.jcrServerChannelID;
                    jcrServerMsgID = globalVar.rogueInfo.jcrServerMsgID;
                    break;
                case 'order' :
                    guildFileName = globalVar.orderInfo.guildJSON;
                    leader = globalVar.orderInfo.leader;
                    dailyTickets = globalVar.orderInfo.dailyTickets;
                    ticketReset = globalVar.orderInfo.dailyTickets;
                    hothDS = globalVar.orderInfo.hothDS;
                    hothLS = globalVar.orderInfo.hothLS;
                    geoDS = globalVar.orderInfo.geoDS;
                    watShards = globalVar.orderInfo.watShards;
                    geoLS = globalVar.orderInfo.geoLS;
                    kamShards = globalVar.orderInfo.kamShards;
                    haat = globalVar.orderInfo.haat;
                    hpit = globalVar.orderInfo.hpit;
                    hstr = globalVar.orderInfo.hstr;
                    cpit = globalVar.orderInfo.cpit;
                    guildGG = globalVar.orderInfo.guildGG;
                    mainServerChannelID = globalVar.orderInfo.mainServerChannelID;
                    mainServerMsgID = globalVar.orderInfo.mainServerMsgID;
                    recruitingServerChannelID = globalVar.orderInfo.recruitingServerChannelID;
                    recruitingServerMsgID = globalVar.orderInfo.recruitingServerMsgID;
                    jcrServerChannelID = globalVar.orderInfo.jcrServerChannelID;
                    jcrServerMsgID = globalVar.orderInfo.jcrServerMsgID;
                    break;
                case 'uprising' :
                    guildFileName = globalVar.uprisingInfo.guildJSON;
                    leader = globalVar.uprisingInfo.leader;
                    dailyTickets = globalVar.uprisingInfo.dailyTickets;
                    ticketReset = globalVar.uprisingInfo.dailyTickets;
                    hothDS = globalVar.uprisingInfo.hothDS;
                    hothLS = globalVar.uprisingInfo.hothLS;
                    geoDS = globalVar.uprisingInfo.geoDS;
                    watShards = globalVar.uprisingInfo.watShards;
                    geoLS = globalVar.uprisingInfo.geoLS;
                    kamShards = globalVar.uprisingInfo.kamShards;
                    haat = globalVar.uprisingInfo.haat;
                    hpit = globalVar.uprisingInfo.hpit;
                    hstr = globalVar.uprisingInfo.hstr;
                    cpit = globalVar.uprisingInfo.cpit;
                    guildGG = globalVar.uprisingInfo.guildGG;
                    mainServerChannelID = globalVar.uprisingInfo.mainServerChannelID;
                    mainServerMsgID = globalVar.uprisingInfo.mainServerMsgID;
                    recruitingServerChannelID = globalVar.uprisingInfo.recruitingServerChannelID;
                    recruitingServerMsgID = globalVar.uprisingInfo.recruitingServerMsgID;
                    jcrServerChannelID = globalVar.uprisingInfo.jcrServerChannelID;
                    jcrServerMsgID = globalVar.uprisingInfo.jcrServerMsgID;
                    break;
                case 'lotus' :
                    guildFileName = globalVar.lotusInfo.guildJSON;
                    leader = globalVar.lotusInfo.leader;
                    dailyTickets = globalVar.lotusInfo.dailyTickets;
                    ticketReset = globalVar.lotusInfo.dailyTickets;
                    hothDS = globalVar.lotusInfo.hothDS;
                    hothLS = globalVar.lotusInfo.hothLS;
                    geoDS = globalVar.lotusInfo.geoDS;
                    watShards = globalVar.lotusInfo.watShards;
                    geoLS = globalVar.lotusInfo.geoLS;
                    kamShards = globalVar.lotusInfo.kamShards;
                    haat = globalVar.lotusInfo.haat;
                    hpit = globalVar.lotusInfo.hpit;
                    hstr = globalVar.lotusInfo.hstr;
                    cpit = globalVar.lotusInfo.cpit;
                    guildGG = globalVar.lotusInfo.guildGG;
                    mainServerChannelID = globalVar.lotusInfo.mainServerChannelID;
                    mainServerMsgID = globalVar.lotusInfo.mainServerMsgID;
                    recruitingServerChannelID = globalVar.lotusInfo.recruitingServerChannelID;
                    recruitingServerMsgID = globalVar.lotusInfo.recruitingServerMsgID;
                    jcrServerChannelID = globalVar.lotusInfo.jcrServerChannelID;
                    jcrServerMsgID = globalVar.lotusInfo.jcrServerMsgID;
                    break;
                case 'phoundlings' :
                    guildFileName = globalVar.phoundlingsInfo.guildJSON;
                    leader = globalVar.phoundlingsInfo.leader;
                    dailyTickets = globalVar.phoundlingsInfo.dailyTickets;
                    ticketReset = globalVar.phoundlingsInfo.dailyTickets;
                    hothDS = globalVar.phoundlingsInfo.hothDS;
                    hothLS = globalVar.phoundlingsInfo.hothLS;
                    geoDS = globalVar.phoundlingsInfo.geoDS;
                    watShards = globalVar.phoundlingsInfo.watShards;
                    geoLS = globalVar.phoundlingsInfo.geoLS;
                    kamShards = globalVar.phoundlingsInfo.kamShards;
                    haat = globalVar.phoundlingsInfo.haat;
                    hpit = globalVar.phoundlingsInfo.hpit;
                    hstr = globalVar.phoundlingsInfo.hstr;
                    cpit = globalVar.phoundlingsInfo.cpit;
                    guildGG = globalVar.phoundlingsInfo.guildGG;
                    mainServerChannelID = globalVar.phoundlingsInfo.mainServerChannelID;
                    mainServerMsgID = globalVar.phoundlingsInfo.mainServerMsgID;
                    recruitingServerChannelID = globalVar.phoundlingsInfo.recruitingServerChannelID;
                    recruitingServerMsgID = globalVar.phoundlingsInfo.recruitingServerMsgID;
                    jcrServerChannelID = globalVar.phoundlingsInfo.jcrServerChannelID;
                    jcrServerMsgID = globalVar.phoundlingsInfo.jcrServerMsgID;
                    break;
                case "hope":
                    guildFileName = globalVar.hopeInfo.guildJSON;
                    leader = globalVar.hopeInfo.leader;
                    dailyTickets = globalVar.hopeInfo.dailyTickets;
                    ticketReset = globalVar.hopeInfo.dailyTickets;
                    hothDS = globalVar.hopeInfo.hothDS;
                    hothLS = globalVar.hopeInfo.hothLS;
                    geoDS = globalVar.hopeInfo.geoDS;
                    watShards = globalVar.hopeInfo.watShards;
                    geoLS = globalVar.hopeInfo.geoLS;
                    kamShards = globalVar.hopeInfo.kamShards;
                    haat = globalVar.hopeInfo.haat;
                    hpit = globalVar.hopeInfo.hpit;
                    hstr = globalVar.hopeInfo.hstr;
                    cpit = globalVar.hopeInfo.cpit;
                    guildGG = globalVar.hopeInfo.guildGG;
                    mainServerChannelID = globalVar.hopeInfo.mainServerChannelID;
                    mainServerMsgID = globalVar.hopeInfo.mainServerMsgID;
                    recruitingServerChannelID = globalVar.hopeInfo.recruitingServerChannelID;
                    recruitingServerMsgID = globalVar.hopeInfo.recruitingServerMsgID;
                    jcrServerChannelID = globalVar.hopeInfo.jcrServerChannelID;
                    jcrServerMsgID = globalVar.hopeInfo.jcrServerMsgID;
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
                        {name: guildData.name, value: 'MEMBERS: `' + guildData.members + '/50` \n' + 
                            'GP: `'+ localGP + '`\n' + 
                            'Daily Tickets: `' + dailyTickets + '`'},
                        {name: 'TERRITORY BATTLES', value: 'HOTH DS: `' + hothDS + '`⭐️\n' +
                            'HOTH LS: `' + hothLS + '`⭐️ \n' +
                            'GEO DS: `' + geoDS + '`⭐️ with `' + watShards + '` <:watshard:709573349579161705>\n' +
                            'GEO LS: `' + geoLS + '`⭐️ with `' + kamShards + '` <:kam:778266623172673536>'},
                        {name: 'RAIDS', value: 'HPIT: `' + hpit +'`\n' +
                            'HAAT: `' + haat + '`\n' +
                            'HSTR: `' + hstr + '`\n' +
                            'CPIT: `' + cpit + '`'},
                        {name: 'SWGOH.GG LINK', value: guildGG},
                        {name: 'INFO LAST UPDATED', value: '`' + localDate + '`'},
                        {name: '\u200B', value: '\u200B' }
                    ) //end .addFields

                    // client.channels.cache.get(jcrServerChannelID).messages.fetch(jcrServerMsgID).then(msg => msg.edit(guildEmbed));
                    message.channel.send(guildEmbed);
                    setTimeout(() => {
                        guildEmbed.fields=[] //clear the fields for the next use
                    }, 2000);

                        //log the event to Discord (jcrAggie server) and the console
                        fileUtils.logToDiscordAndConsole(client, message, args, Discord);

                    }//end try 
                    catch (err) {
                        console.log('---ERROR PARSING JSON STRING: ', err);

                    }//end catch
                
                })//end fs.readFile
            } // end else

            //log the event to Discord (jcrAggie server) and the console
            fileUtils.logToDiscordAndConsole(client, message, args, Discord);

    }//end async execute

}//end module.exports