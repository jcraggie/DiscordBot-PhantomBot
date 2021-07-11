//function code
const { GuildEmoji } = require('discord.js'); // I did not write this line; inserted by VS Code?



async function getGuildUpdates(client, message, args, Discord,swapi, ApiSwgohHelp, isCron) {
    // isCron is a boolean that is true if the command was run by cron

    // guided by code found at https://www.yaoyuyang.com/2017/01/20/nodejs-batch-file-processing.html
    // adapted and edited for PhantomBot on 2021-06-19 by JCR

    // gets all guild data from the api.swgoh.help
    // updates the mongoDB atlas file

    // const { merge } = require('@hapi/hoek');
    // const writeguilds = require('./writeguilds.js');
    (async () => {
        const globalVar = require ('../global');
        const mongoose = require('mongoose');
        const GuildData = require('../commands/models/GuildData');
        const fileUtils = require('./fileHelper');
        var msgConsole;
        var msgDiscord;



        mongoose.connect(process.env.MONGO_GUILDDATA_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
            if (err)
                console.error(err);
            else {
                // console.log("---CONNECTED TO THE MONGODB: GuildData"); 
                // if (!isCron) message.channel.send('Connected to JCR\'s mongoDB: GuildData');
                // client.channels.cache.get(globalVar.discordChannels.log).send('Connected to JCR\'s mongoDB: GuildData');
                msgDiscord = 'Connected to JCR\'s mongoDB: GuildData';
                msgConsole = '---CONNECTED TO THE MONGODB: GuildData';
                // log messages to both Discord log channel and Console
                fileUtils.logBotToDiscordAndConsole(client, message, args, Discord, msgDiscord, msgConsole);
            } // end else
        }); // end mongoose connect
        
        var allyCodes = [135718294, 418877148, 924484782, 618277879, 993689571, 582412773, 315585918, 681711581, 166494741];
        // var allyCodes = [135718294, 418877148, 618277879]; //REBELLION EMPIRE ROGUE for testing
        // var allyCodes = [135718294]; // REBELLION ONLY for testing

        msgConsole = '---UPDATING ALL DATA USING ALLYCODES: ' + allyCodes;
        msgDiscord = 'Updating all data using allycodes: ' + allyCodes;
        // log messages to both Discord log channel and Console
        fileUtils.logBotToDiscordAndConsole(client, message, args, Discord, msgDiscord, msgConsole);
        const fs = require('fs');
        
        // const {botToken, swgohHelpUser, swgohHelpPW,swgohHelpID, swgohHelpSecret} = require(`../config`); // for local testing only
        let swgohHelpID
        let swgohHelpSecret
        // process.env.BOT_TOKEN
        var acquiredToken = 0;

        ApiSwgohHelp = require('api-swgoh-help');
        swapi = new ApiSwgohHelp({
            "protocol":"https",
            "host":"api.swgoh.help",
            "username":process.env.SWGOH_HELP_USERNAME,
            "password":process.env.SWGOH_HELP_PASSWORD,
            "client_id":swgohHelpID,
            "client_secret":swgohHelpSecret
        });


        const apiGuildData = await getAPIData();
        const updatedTF = await updateDB(apiGuildData);
        console.log(updatedTF);


        async function updateDB(apiGuildData) {
            for(const gData of apiGuildData) {
                //console.log('---GDATA: \n', gData)
                var currEpoch = Math.floor(new Date().getTime())

                var dateConvert = new Date(gData.updated - (18000 * 1000)); //convert epoch timestamp to CST date and time
                var localDate = dateConvert.toLocaleString("en-US"); //convert date and time to local
                
                var fetchDateConvert = new Date(currEpoch - (18000 * 1000)); //convert epoch timestamp to CST date and time
                var fetchLocalDate = fetchDateConvert.toLocaleString("en-US"); //convert date and time to local

                const query = {
                    "name": gData.name
                };
                const update = {  
                    "$set": {
                        "desc": gData.desc,
                        "members": gData.members,
                        "status": gData.status,
                        "required": gData.required,
                        "bannerColor": gData.bannerColor,
                        "bannerLogo": gData.bannerLogo,
                        "message": gData.message,
                        "raid": gData.raid,
                        "roster": gData.roster,
                        "gp": gData.gp,
                        "updated": gData.updated,
                        "updatedText": localDate,
                        "fetchEpoch": currEpoch,
                        "fetchText": fetchLocalDate
                    }
                };
                const options = {returnNewDocument: true,
                    useFindAndModify: false // going away in mongoose 6.0?
                
                };
                GuildData.findOneAndUpdate(query, update, options, (error, guilddata) => {
                        // console.log(error, guilddata)
                        ;
                    }).then(updatedDocument => {
                        if(updatedDocument) {
                            // console.log(`---Successfully updated document: ${updatedDocument}.`)
                        } else {
                            console.log('---No document matches the provided query.')
                        }
                    })

            } // end for
            return(true);
        } // end async function updateDB


        async function getAPIData() {
            try {
                console.log('---ACQUIRING api.swgoh.help TOKEN... PLEASE WAIT.');
                acquiredToken = await swapi.connect();

                if (!acquiredToken) throw "is null. API might be down.";
            
            }
            catch(err){
                console.log('---ACQUIRED TOKEN ERROR: ' + err);
                //return;

            }
            finally {

                // console.log('---READING API DATA NOW');
                // if(!isCron) message.channel.send('Reading Guild Data from SWGOH.HELP.\nPlease be patient. This could take a few mins.');        
                msgDiscord = 'Reading Guild Data from SWGOH.HELP.\nPlease be patient. This could take a few mins.';
                msgConsole = '---READING API DATA NOW';
                // log messages to both Discord log channel and Console
                fileUtils.logBotToDiscordAndConsole(client, message, args, Discord, msgDiscord, msgConsole);

                console.log('---ACQUIRED TOKEN: ' , acquiredToken);
                var now = new Date(); 
                var tokenExpiry = new Date();
                tokenExpiry.setHours(tokenExpiry.getHours() + 1);
                console.log('---NOW: ',now);
                console.log('---EXPIRES AT: ', tokenExpiry);

                var apiGuildData = [];
                var fileGuildData = [];
                var newGuildData = [];

                var done = false;

                apiGuildData = await fileUtils.getNewData(client, message, args, Discord,swapi, ApiSwgohHelp, allyCodes, isCron);

                var x = 0;
                // console.log('---APIGUILDDATA\n', apiGuildData);
                return apiGuildData;

            } // end finally
        } // end async function getAPIData()


        //log the event to Discord (jcrAggie server) and the console
        // fileUtils.logToDiscordAndConsole(client, message, args, Discord);
    })();
}//end async function getGuildUpdates





async function sendGuildUpdates(client, message, args, Discord,swapi, ApiSwgohHelp, isCron) {
    (async () => {
    
    
    var fileUtils = require('./fileHelper');
    const globalVar = require ('../global');    
    const mongoose = require('mongoose');
    const GuildData = require('../commands/models/GuildData');
    var msgDiscord;
    var msgConsole;


    mongoose.connect(process.env.MONGO_GUILDDATA_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
        if (err)
            console.error(err);
        else {
            // console.log("---CONNECTED TO THE MONGODB: GuildData"); 
            // if(!isCron) message.channel.send('Connected to JCR\'s mongoDB: GuildData');
            // client.channels.cache.get(globalVar.discordChannels.log).send('Connected to JCR\'s mongoDB: GuildData');
            msgConsole = '---CONNECTED TO THE MONGODB: GuildData';
            msgDiscord = 'Connected to JCR\'s mongoDB: GuildData';
            // log messages to both Discord log channel and Console
            fileUtils.logBotToDiscordAndConsole(client, message, args, Discord, msgDiscord, msgConsole);
            } // end else
    }); // end mongoose connect


    // function sendGetGuildHelp() {
    //     var globalVar = require('./global');
    //     // var fileUtils = require('./fileHelper');
    //     let getguildHelp = globalVar.phantomBotHelp
    //     .setTitle("PhantomBot Help")
    //     .setDescription("**COMMAND: **" + '`' + module.exports.name + '`')
    //     .addFields(                
    //         {name: 'DESCRIPTION', value: module.exports.description},
    //         {name: 'USAGE', value: "`pb.getguild guild_name`"},
    //         {name: 'EXAMPLE', value: "`pb.getguild rebellion`"},
    //         {name: '\u200B', value: '\u200B' }
            
    //     )
    //     message.channel.send(getguildHelp);
    //     getguildHelp.fields=[] //clear the fields for the next use

    //     } // end function sendNewMemberHelp
    //     if (args[0] == "help"){
    //         sendGetGuildHelp();

    //         //log the event to Discord (jcrAggie server) and the console
    //         fileUtils.logToDiscordAndConsole(client, message, args, Discord);

    //     } else {
            var counter = 1;
            var index = 0;
            var guildUpdateEmbed = [];
            // client.channels.cache.get(globalVar.discordChannels.log).send('Beginning to update guild data');
            msgDiscord = 'Beginning to update guild data';
            msgConsole = '---BEGINNING TO UPDATE GUILD DATA';
            // log messages to both Discord log channel and Console
            fileUtils.logBotToDiscordAndConsole(client, message, args, Discord, msgDiscord, msgConsole);


            var gld = '';
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
            var totalGuilds = gNames.length;
            // console.log ('---TOTAL GUILDS TO BE UPDATED: ', totalGuilds);
            msgConsole = '---TOTAL GUILDS TO BE UPDATED: ' + totalGuilds;
            msgDiscord = 'Total Guilds to be updated: ' + totalGuilds;
            // log messages to both Discord log channel and Console
            fileUtils.logBotToDiscordAndConsole(client, message, args, Discord, msgDiscord, msgConsole);

            

            for(gld of gNames) {

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
                    if(!isCron) message.channel.send('Cannot find that guild.');
                    return;
            }//end switch

            // console.log('---READING GUILD # ', counter, ': ',gld);
            msgConsole = '---READING GUILD # ' + counter + ': ' + gld;
            msgDiscord = 'Reading guild # ' + counter + ': ' + '`' + gld + '`';
            // log messages to both Discord log channel and Console
            fileUtils.logBotToDiscordAndConsole(client, message, args, Discord, msgDiscord, msgConsole);

            var gData;

            
                gData = await GuildData.findById(mongo_id, (error) => {
                    if(error) {
                        console.log('---GUILDDATA FIND BY ID ERROR: ', error);
                    }
                }) // end await GuildData.findById
            

            var guildData = gData;
            
            var dateConvert = new Date(guildData['updated'] - (18000 * 1000)); //convert epoch timestamp to date and time
            var localDate = dateConvert.toLocaleString(); //convert date and time to local
            var localGP = guildData.gp.toLocaleString("en-US"); //add commas to GP
            console.log('---DATA SUMMARY: ',guildData['name'], ':', guildData['members'], 'GP:', guildData['gp'], ' Updated: ',localDate);

            
                var guildEmbed = await updateEmbed(
                    guildData['name'], leader, guildData['members'],
                    localGP, dailyTickets,
                    hothDS, hothLS, 
                    geoDS, watShards,
                    geoLS, kamShards,
                    hpit, haat, hstr, cpit,
                    guildGG, localDate);
            

            
                await sendToJCR(guildEmbed);
                await sendToMain(guildEmbed);
                await sendToRecruiting(guildEmbed);
            

            if(counter == totalGuilds) {
                console.log('---FINISHED LOOPING THROUGH ALL GUILD NAMES');

                mongoose.connection.close(function () {
                    // console.log('---MONGOOSE CONNECTION IS NOW CLOSED');
                    // console.log('---FINSHED UPDATING GUILDS');
                    // if(!isCron) message.channel.send('Finished updating guilds\nDisconnected from JCR\'s DB');
                    // client.channels.cache.get(globalVar.discordChannels.log).send('Finished updating guilds\nDisconnected from JCR\'s DB');
                    msgDiscord = 'Finished updating guilds\nDisconnected from JCR\'s DB';
                    msgConsole = '---MONGOOSECONNECTION IS NOW CLOSED\n---FINISHED UPDATING GUILDS';


                    // log messages to both Discord log channel and Console
                    fileUtils.logBotToDiscordAndConsole(client, message, args, Discord, msgDiscord, msgConsole);


                    });
                
            } // end if

            counter += 1;

        } // end for gld of gNames


    // } // end else

    function updateEmbed(
        guildData_name, leader, guildData_members, localGP, dailyTickets,
        hothDS, hothLS,
        geoDS, watShards,
        geoLS, kamShards,
        hpit, haat, hstr, cpit,
        guildGG, localDate ) {
            return new Promise(async (resolve, reject) => {

                var guildEmbed = globalVar.phantomBotGuilds
                    // .setTitle("THE PHANTOM ALLIANCE GUILD INFO")
                    guildEmbed.description = '**' + guildData_name + '**';
                    guildEmbed.fields[0] =
                        {name: 'GUILD INFORMATION', value: 'LEADER: `' + leader + '`\n' + 
                            'MEMBERS `' + guildData_members + '/50` \n' +
                            'GP: `'+ localGP + '`\n' + 
                            'Daily Tickets: `' + dailyTickets + '`'}
                        guildEmbed.fields[1] = {name: 'TERRITORY BATTLES', value: 'HOTH DS: `' + hothDS + '`⭐️\n' +
                            'HOTH LS: `' + hothLS + '`⭐️ \n' +
                            'GEO DS: `' + geoDS + '`⭐️ with `' + watShards + '` <:watshard:709573349579161705>\n' +
                            'GEO LS: `' + geoLS + '`⭐️ with `' + kamShards + '` <:kam:778266623172673536>'}
                        guildEmbed.fields[2] = {name: 'RAIDS', value: 'HPIT: `' + hpit +'`\n' +
                            'HAAT: `' + haat + '`\n' +
                            'HSTR: `' + hstr + '`\n' +
                            'CPIT: `' + cpit + '`'}
                        guildEmbed.fields[3] = {name: 'SWGOH.GG LINK', value: guildGG}
                        guildEmbed.fields[4] = {name: 'INFO LAST UPDATED', value: '`' + localDate + '`'}
                console.log('---EMBED DATA FOR ' + guildData_name + ' IS NOW SET');
                resolve(guildEmbed);
            });

    }; // end async function updateEmbed



    async function sendToJCR(gldEmb) {
        return new Promise(resolve => {
            (async() => {
                const result = await sendEmbed(jcrServerChannelID, jcrServerMsgID, gldEmb)
                resolve(console.log(result + ' TO JCR SERVER'));
            })();
        });

    };

    async function sendToRecruiting(gldEmb) {
        return new Promise(resolve => {
            (async() => {
                const result = await sendEmbed(recruitingServerChannelID, recruitingServerMsgID, gldEmb);
                resolve(console.log(result + ' TO RECRUITING SERVER'));
            })();
        });

    };

    async function sendToMain(gldEmb) {
        return new Promise(resolve => {
            (async() => {
                const result = await sendEmbed(mainServerChannelID, mainServerMsgID, gldEmb);
                resolve(console.log(result + ' TO MAIN SERVER'));
            })();
        });

    };

    function sendEmbed(chID, msgID, gldEmb) {
        return new Promise(resolve => {

            (async() => {
                await client.channels.cache.get(chID).messages.fetch(msgID).then(msg => msg.edit(gldEmb));
                // await guild.channels.cache.get(chID).messages.fetch(msgID).then(msg => msg.edit(gldEmb));
                resolve('------SENT EMBED');
            })();

        });
    }
})();


}//end function sendGuildUpdates






























async function testUpdate(client, message, args, Discord, swapi, ApiSwgohHelp, isCron) {

    (async () => {
        var fileUtils = require("./fileHelper");
        const globalVar = require("../global");
        const mongoose = require("mongoose");
        const GuildData = require("../commands/models/GuildData");
        var msgDiscord;
        var msgConsole;

        mongoose.connect(
            process.env.MONGO_GUILDDATA_DB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            (err) => {
                if (err) console.error(err);
                else {                    
                    msgConsole = "---CONNECTED TO THE MONGODB: GuildData";
                    msgDiscord = "Connected to JCR's mongoDB: GuildData";
                    // log messages to both Discord log channel and Console
                    fileUtils.logBotToDiscordAndConsole(client, message, args, Discord, msgDiscord, msgConsole);
                } // end else
            }
        ); // end mongoose connect

        var counter = 1;
        var index = 0;
        var guildUpdateEmbed = [];
        // client.channels.cache.get(globalVar.discordChannels.log).send('Beginning to update guild data');
        msgDiscord = "Beginning to update guild data";
        msgConsole = "---BEGINNING TO UPDATE GUILD DATA";
        // log messages to both Discord log channel and Console
        fileUtils.logBotToDiscordAndConsole(client, message, args, Discord, msgDiscord, msgConsole);

        var gld = "";
        const gNames = [
            "rebellion",
            "empire",
            "havoc",
            "rogue",
            "order",
            "uprising",
            "lotus",
            "phoundlings",
            "hope",
        ]; // end gNames
        var totalGuilds = gNames.length;
        msgConsole = "---TEST TOTAL GUILDS TO BE UPDATED: " + totalGuilds;
        msgDiscord = "Total Guilds to be updated: " + totalGuilds;
        // log messages to both Discord log channel and Console
        fileUtils.logBotToDiscordAndConsole(client, message, args, Discord, msgDiscord, msgConsole);


        var fieldName = "commonGuildName";
        var fieldValue = "";
        var query = {};

        for (gld of gNames) {
            // form query searching mongoDB GuildData for commonGuildName = gld
            fieldName = "commonGuildName";
            fieldValue = gld;
            query = {};
            query[fieldName] = fieldValue;
            // end query formation

            msgConsole = "---TEST READING GUILD # " + counter + ": " + gld;
            msgDiscord = "Test Reading guild # " + counter + ": " + "`" + gld + "`";
            // log messages to both Discord log channel and Console
            fileUtils.logBotToDiscordAndConsole(client, message, args, Discord, msgDiscord, msgConsole);

            var gData;

            gData = await GuildData.findOne(query, (error, guildData) => {
                if (error) {
                    console.log("---GUILDDATA FIND BY ID ERROR: ", error);
                    return;
                } 
            }); // end await GuildData.findById
            guildData = gData;
                    
            console.log("------UPDATING GUILD: ", guildData.name);
            gName = guildData.name;
            leader = guildData.leader;
            members = guildData.members;
            gp = guildData.gp;
            updatedText = guildData.updatedText;
            cpit = guildData.cpit;
            dailyTickets = guildData.dailyTickets;
            geoDS = guildData.geoDS;
            geoLS = guildData.geoLS;
            guildGG = guildData.guildGG;
            haat = guildData.haat;
            hothDS = guildData.hothDS;
            hothLS = guildData.hothLS;
            hpit = guildData.hpit;
            hstr = guildData.hstr;
            jcrServerMsgID = guildData.jcrServerMsgID;
            kamShards = guildData.kamShards;
            mainServerMsgID = guildData.mainServerMsgID;
            recruitingServerMsgID = guildData.recruitingServerMsgID;
            ticketReset = guildData.ticketReset;
            watShards = guildData.watShards;

            localGP = gp.toLocaleString("en-US"); //add commas to GP
                        // (async () => {
            var guildEmbed = await testUpdateEmbed(
                gName, leader, members, localGP, dailyTickets,
                hothDS, hothLS,
                geoDS, watShards,
                geoLS, kamShards,
                hpit, haat, hstr, cpit,
                guildGG, updatedText)
                            // }) // end (async ()
                        // (async() => {
            // console.log('---GUILD EMBED BEFORE GOING TO JCR: \n', guildEmbed);
            await TESTsendToJCR(guildEmbed);
            await TESTsendToMain(guildEmbed);
            await TESTsendToRecruiting(guildEmbed);
                        // }) // end (async ()

                        //console.log(guildData);
            if (counter == totalGuilds) {
                // log messages to both Discord log channel and Console
                fileUtils.logBotToDiscordAndConsole(client, message, args, Discord, msgDiscord, msgConsole);;
                return;
            } 
            counter += 1;
                // end if counter == totalGuilds
                    
                
            

            // console.log('---FOUND GUILD', guildData['name'], ' with leader: ', guildData['leader']);
            // counter += 1;
        } // end for gld of gNames

        function testUpdateEmbed(
            gName, leader, members, localGP, dailyTickets,
            hothDS, hothLS,
            geoDS, watShards,
            geoLS, kamShards,
            hpit, haat, hstr, cpit,
            guildGG, updatedText) {
            return new Promise(async (resolve, reject) => {

                var guildEmbed = globalVar.phantomBotGuilds
                // .setTitle("THE PHANTOM ALLIANCE GUILD INFO")
                guildEmbed.description = '**' + gName + '**';
                guildEmbed.fields[0] = {
                    name: 'GUILD INFORMATION',
                    value: 'LEADER: `' + leader + '`\n' +
                        'MEMBERS `' + members + '/50` \n' +
                        'GP: `' + localGP + '`\n' +
                        'Daily Tickets: `' + dailyTickets + '`'
                }
                guildEmbed.fields[1] = {
                    name: 'TERRITORY BATTLES',
                    value: 'HOTH DS: `' + hothDS + '`⭐️\n' +
                        'HOTH LS: `' + hothLS + '`⭐️ \n' +
                        'GEO DS: `' + geoDS + '`⭐️ with `' + watShards + '` <:watshard:709573349579161705>\n' +
                        'GEO LS: `' + geoLS + '`⭐️ with `' + kamShards + '` <:kam:778266623172673536>'
                }
                guildEmbed.fields[2] = {
                    name: 'RAIDS',
                    value: 'HPIT: `' + hpit + '`\n' +
                        'HAAT: `' + haat + '`\n' +
                        'HSTR: `' + hstr + '`\n' +
                        'CPIT: `' + cpit + '`'
                }
                guildEmbed.fields[3] = {
                    name: 'SWGOH.GG LINK',
                    value: guildGG
                }
                guildEmbed.fields[4] = {
                    name: 'INFO LAST UPDATED',
                    value: '`' + updatedText + '`'
                }
                console.log('---EMBED DATA FOR ' + gName + ' IS NOW SET');
                // console.log('------SEEING IF THIS GLOB VAR IS SET: ', globalVar.serverIDs.jcrServerID);
                resolve(guildEmbed);
            });

        }; // end async function testUpdateEmbed

        async function TESTsendToJCR(gldEmb) {
            return new Promise(resolve => {
                (async () => {
                    const result = await TESTsendEmbed(globalVar.serverIDs.jcrServerChannelID, jcrServerMsgID, gldEmb)
                    resolve(console.log(result + ' TO JCR SERVER'));
                })();
            });

        };

        async function TESTsendToRecruiting(gldEmb) {
            return new Promise(resolve => {
                (async () => {
                    const result = await TESTsendEmbed(globalVar.serverIDs.recruitingServerChannelID, recruitingServerMsgID, gldEmb);
                    resolve(console.log(result + ' TO RECRUITING SERVER'));
                })();
            });

        };

        async function TESTsendToMain(gldEmb) {
            return new Promise(resolve => {
                (async () => {
                    const result = await TESTsendEmbed(globalVar.serverIDs.mainServerChannelID, mainServerMsgID, gldEmb);
                    resolve(console.log(result + ' TO MAIN SERVER'));
                })();
            });

        };

        function TESTsendEmbed(chID, msgID, gldEmb) {
            return new Promise(resolve => {

                (async () => {
                    // console.log('---chID : msgID', chID, msgID);
                    await client.channels.cache.get(chID).messages.fetch(msgID).then(msg => msg.edit(gldEmb));
                    // await guild.channels.cache.get(chID).messages.fetch(msgID).then(msg => msg.edit(gldEmb));
                    resolve('------SENT EMBED');
                })();

            });
        }
    })();
}







//shows these functions to the outside world
module.exports = {
    getGuildUpdates,
    sendGuildUpdates,
    testUpdate
    

};
