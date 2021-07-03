module.exports = {
    name: 'mongoeditall',
    description: "reads all guilds from MongoDB and updates it in the guild numbers channel(s) specified",
    async execute(client, message, args, Discord,swapi, ApiSwgohHelp){
        const globalVar = require ('../global.js');
        var fileUtils = require('../fileHelper.js');

        const mongoose = require('mongoose');
        const GuildData = require('./models/GuildData');
        mongoose.connect(process.env.MONGO_GUILDDATA_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
            if (err)
                console.error(err);
            else
                console.log("Connected to the mongodb: GuildData"); 
                message.channel.send('Connected to the mongoDB GuildData');
        }); // end mongoose connect
        
        // _id:60dbb1c8d9d9a0038a9f3a41 = Rebellion jcr laptop local

        // _id:60dc856a0572f4e54c08bf7b = Rebellion online MongoDB Atlas
        // _id:60dc856a0572f4e54c08bf7c = Empire online MongoDB Atlas
        // _id:60dc856a0572f4e54c08bf7d = Havoc online MongoDB Atlas
        // _id:60dc856a0572f4e54c08bf7e = Rogue online MongoDB Atlas
        // _id:60dc856a0572f4e54c08bf7f = Order online MongoDB Atlas
        // _id:60dc856a0572f4e54c08bf80 = Uprising online MongoDB Atlas
        // _id:60dc856a0572f4e54c08bf81 = Lotus online MongoDB Atlas
        // _id:60dc856a0572f4e54c08bf82 = Phoundlings online MongoDB Atlas
        // _id:60dc856a0572f4e54c08bf83 = Hope online MongoDB Atlas


        
        // message.channel.send('First edit attempt');
        
        // jcrAggie server
        // rebellion message id: 858495427637018634
        // empire message id: 858553385086484501
        // phantom-guilds channel id: 858495181552353313

        // phantom alliance server
        // guild-numbers channel id: 485246576751673354
        // guild-numbers rebellion msg id: 858547295427756051 (PB3)

        // phantom alliance recruiting server
        // guild-numbers channel id: 595255366644924440
        // guild-numbers message id: 859844296299249704 (rebellion stats)

        
        // client.channels.cache.get('858495181552353313').messages.fetch('858495427637018634').then(msg => msg.edit(args[0]));
        
        
        // //log the event to Discord (jcrAggie server) and the console
        // fileUtils.logToDiscordAndConsole(client, message, args, Discord);


        /////////////////////////////////////////////////////////////////////////////////////////////////

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

              for(gld of gNames) {

                var guildFileName = false;

                    switch(gld) {
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
                            mongo_id = globalVar.rebellionInfo.mongo_id;
                            
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
                            mongo_id = globalVar.empireInfo.mongo_id;
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
                            mongo_id = globalVar.havocInfo.mongo_id;
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
                            mongo_id = globalVar.rogueInfo.mongo_id;
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
                            mongo_id = globalVar.orderInfo.mongo_id;
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
                            mongo_id = globalVar.uprisingInfo.mongo_id;
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
                            mongo_id = globalVar.lotusInfo.mongo_id;
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
                            mongo_id = globalVar.phoundlingsInfo.mongo_id;
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
                            mongo_id = globalVar.hopeInfo.mongo_id;
                            break;
                        default:
                            message.channel.send('Cannot find that guild.');
                            return;
                    }//end switch

                    const gData = await GuildData.findById(mongo_id, (error, guilddata) => {
                        // console.log(error, guilddata);
                        console.log(error);
                    })







                    // const guildFilePath = './guilds/';
                    // const guildList = [];

                    // const guildToRead = guildFilePath + guildFileName;

                    // const fs = require('fs');
                    

                    const guildData = gData;
                    console.log(guildData['name'], ': ', guildData['members'], '  GP: ', guildData['gp'], ' Updated: ',guildData['updated']);

                    var dateConvert = new Date(guildData['updated'] * 1000); //convert epoch timestamp to date and time
                    var localDate = dateConvert.toLocaleString(); //convert date and time to local
                    var localGP = guildData.gp.toLocaleString("en-US"); //add commas to GP

                    // var globalVar = require('../global.js');
                    let guildEmbed = globalVar.phantomBotHelp
                    .setTitle("THE PHANTOM ALLIANCE GUILD INFO")
                    .setDescription(" ")
                    .addFields(
                        {name: guildData['name'], value: 'LEADER: `' + leader + '`\n' + 
                            'MEMBERS `' + guildData['members'] + '/50` \n' +
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


                    sendToJCROnly2(guildEmbed);


                    // sendToJCR(guildEmbed);
                    // sendToRecruiting(guildEmbed);
                    // sendToMain(guildEmbed);
                    // client.channels.cache.get(jcrServerChannelID).messages.fetch(jcrServerMsgID).then(msg => msg.edit(guildEmbed));
                    // client.channels.cache.get(recruitingServerChannelID).messages.fetch(recruitingServerMsgID).then(msg => msg.edit(guildEmbed));
                    // client.channels.cache.get(mainServerChannelID).messages.fetch(mainServerMsgID).then(msg => msg.edit(guildEmbed));
                    // message.channel.send(guildEmbed);
                    // setTimeout(() => {
                    //     guildEmbed.fields=[] //clear the fields for the next use
                    // }, 5000);

                    
            } // end for gld of gNames

            //log the event to Discord (jcrAggie server) and the console
            fileUtils.logToDiscordAndConsole(client, message, args, Discord);

        } // end else

        async function sendToJCROnly2() {
            return new Promise(resolve => {
                resolve('Hello world');
            }); // end resolve
        };

        // async function sendToJCR3(guildEmbed) {
        //     return new Promise(resolve => {
        //         const result = await sendEmbed(jcrServerChannelID, jcrServerMsgID, guildEmbed);
        //         const final = result + ' TO JCR SERVER';
        //         resolve(final);

        //     });

        // }

        async function sendToJCROnly(guildEmbed) {
            console.log('---SENDING TO JCR');
            const result1 = await sendToJCR(guildEmbed);
            console.log(result1);
            
            console.log('---CLEARING EMBED FOR NEXT GUILD');
            const result4 = await clearEmbed(guildEmbed);
            console.log(result4);
        };

        async function sendToAllServers(guildEmbed) {
            console.log('---SENDING TO JCR');
            const result1 = await sendToJCR(guildEmbed);
            console.log(result1);
            console.log('---SENDING TO RECRUITING');
            const result2 = await sendToRecruiting(guildEmbed);
            console.log(result2);
            const result3 = await sendToMain(guildEmbed);
            console.log(result3);
            console.log('---CLEARING EMBED FOR NEXT GUILD');
            const result4 = await clearEmbed(guildEmbed);
            console.log(result4);
        };

        function clearEmbed(guildEmbed) {
            return new Promise(resolve => {
                
                guildEmbed.fields=[] //clear the fields for the next use
                resolve('---EMBED FIELDS CLEARED')
                
            });
        };

        async function sendToJCR(guildEmbed) {
            return new Promise(resolve => {
                const result = await sendEmbed(jcrServerChannelID, jcrServerMsgID, guildEmbed)
                resolve(result + ' TO JCR SERVER')
            });

        };

        async function sendToRecruiting(guildEmbed) {
            const result = await sendEmbed(recruitingServerChannelID, recruitingServerMsgID, guildEmbed);
            console.log(result + ' TO RECRUITING SERVER');

        };

        async function sendToMain(guildEmbed) {
            const result = await sendEmbed(mainServerChannelID, mainServerMsgID, guildEmbed);
            console.log(result + ' TO RECRUITING SERVER');

        };

        function sendEmbed(chID,msgID,embd) {
            return new Promise(resolve => {
                client.channels.cache.get(chID).messages.fetch(msgID).then(msg => msg.edit(embd));
                resolve('---SENT EMBED');

            });
        }







    }//end async execute

}//end module.exports