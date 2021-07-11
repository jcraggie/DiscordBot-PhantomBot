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







async function updateGuildEmbeds(client, message, args, Discord, swapi, ApiSwgohHelp, isCron) {

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
        msgConsole = "---TOTAL GUILDS TO BE UPDATED: " + totalGuilds;
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

            msgConsole = "---READING GUILD # " + counter + ": " + gld;
            msgDiscord = "Reading guild # " + counter + ": " + "`" + gld + "`";
            // log messages to both Discord log channel and Console
            fileUtils.logBotToDiscordAndConsole(client, message, args, Discord, msgDiscord, msgConsole);

            var gData;

            gData = await GuildData.findOne(query, (error, guildData) => {
                if (error) {
                    console.log("---GUILDDATA FIND BY ID ERROR: ", error);
                    return;
                } 
            }); // end await GuildData.fineOne
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

            var guildEmbed = await updateEmbed(
                gName, leader, members, localGP, dailyTickets,
                hothDS, hothLS,
                geoDS, watShards,
                geoLS, kamShards,
                hpit, haat, hstr, cpit,
                guildGG, updatedText)

            // console.log('---GUILD EMBED BEFORE GOING TO JCR: \n', guildEmbed);
            await sendToJCR(guildEmbed);
            await sendToMain(guildEmbed);
            await sendToRecruiting(guildEmbed);
                        // }) // end (async ()

                        //console.log(guildData);
            if (counter == totalGuilds) {
                // log messages to both Discord log channel and Console
                // fileUtils.logBotToDiscordAndConsole(client, message, args, Discord, msgDiscord, msgConsole);
                msgConsole = "---FINISHED SENDING UPDATED EMBEDS TO ALL CHANNELS";
                msgDiscord = "Finished sending updated embeds to all channels";
                // log messages to both Discord log channel and Console
                fileUtils.logBotToDiscordAndConsole(client, message, args, Discord, msgDiscord, msgConsole);
                return;
            } 
            counter += 1;
                // end if counter == totalGuilds
                    
                
            

            // console.log('---FOUND GUILD', guildData['name'], ' with leader: ', guildData['leader']);
            // counter += 1;
        } // end for gld of gNames

        // function updateEmbed(
        //     gName, leader, members, localGP, dailyTickets,
        //     hothDS, hothLS,
        //     geoDS, watShards,
        //     geoLS, kamShards,
        //     hpit, haat, hstr, cpit,
        //     guildGG, updatedText) {
        //     return new Promise(async (resolve, reject) => {

        //         var guildEmbed = globalVar.phantomBotGuilds
        //         // .setTitle("THE PHANTOM ALLIANCE GUILD INFO")
        //         guildEmbed.description = '**' + gName + '**';
        //         guildEmbed.fields[0] = {
        //             name: 'GUILD INFORMATION',
        //             value: 'LEADER: `' + leader + '`\n' +
        //                 'MEMBERS `' + members + '/50` \n' +
        //                 'GP: `' + localGP + '`\n' +
        //                 'Daily Tickets: `' + dailyTickets + '`'
        //         }
        //         guildEmbed.fields[1] = {
        //             name: 'TERRITORY BATTLES',
        //             value: 'HOTH DS: `' + hothDS + '`⭐️\n' +
        //                 'HOTH LS: `' + hothLS + '`⭐️ \n' +
        //                 'GEO DS: `' + geoDS + '`⭐️ with `' + watShards + '` <:watshard:709573349579161705>\n' +
        //                 'GEO LS: `' + geoLS + '`⭐️ with `' + kamShards + '` <:kam:778266623172673536>'
        //         }
        //         guildEmbed.fields[2] = {
        //             name: 'RAIDS',
        //             value: 'HPIT: `' + hpit + '`\n' +
        //                 'HAAT: `' + haat + '`\n' +
        //                 'HSTR: `' + hstr + '`\n' +
        //                 'CPIT: `' + cpit + '`'
        //         }
        //         guildEmbed.fields[3] = {
        //             name: 'SWGOH.GG LINK',
        //             value: guildGG
        //         }
        //         guildEmbed.fields[4] = {
        //             name: 'INFO LAST UPDATED',
        //             value: '`' + updatedText + '`'
        //         }
        //         console.log('------EMBED DATA FOR ' + gName + ' IS NOW SET');
        //         // console.log('------SEEING IF THIS GLOB VAR IS SET: ', globalVar.serverIDs.jcrServerID);
        //         resolve(guildEmbed);
        //     });

        // }; // end async function updateEmbed

        // async function sendToJCR(gldEmb) {
        //     return new Promise(resolve => {
        //         (async () => {
        //             const result = await sendEmbed(globalVar.serverIDs.jcrServerChannelID, jcrServerMsgID, gldEmb)
        //             resolve(console.log(result + ' TO JCR SERVER'));
        //         })();
        //     });

        // };

        // async function sendToRecruiting(gldEmb) {
        //     return new Promise(resolve => {
        //         (async () => {
        //             const result = await sendEmbed(globalVar.serverIDs.recruitingServerChannelID, recruitingServerMsgID, gldEmb);
        //             resolve(console.log(result + ' TO RECRUITING SERVER'));
        //         })();
        //     });

        // };

        // async function sendToMain(gldEmb) {
        //     return new Promise(resolve => {
        //         (async () => {
        //             const result = await sendEmbed(globalVar.serverIDs.mainServerChannelID, mainServerMsgID, gldEmb);
        //             resolve(console.log(result + ' TO MAIN SERVER'));
        //         })();
        //     });

        // };

        // function sendEmbed(chID, msgID, gldEmb) {
        //     return new Promise(resolve => {

        //         (async () => {
        //             // console.log('---chID : msgID', chID, msgID);
        //             await client.channels.cache.get(chID).messages.fetch(msgID).then(msg => msg.edit(gldEmb));
        //             // await guild.channels.cache.get(chID).messages.fetch(msgID).then(msg => msg.edit(gldEmb));
        //             resolve('------SENT EMBED');
        //         })();

        //     });
        // }
    })();
} // end updateGuildEmbeds()






















async function updateOneEmbed(client, message, args, Discord, guildToUpdate) {

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

        msgDiscord = "Updating guild data for: `" + guildToUpdate + "`";
        msgConsole = "---UPDATING GUILD DATA FOR: " + guildToUpdate;
        // log messages to both Discord log channel and Console
        fileUtils.logBotToDiscordAndConsole(client, message, args, Discord, msgDiscord, msgConsole);

        var fieldName = "commonGuildName";
        var fieldValue = guildToUpdate;
        var query = {};

        query[fieldName] = fieldValue;
        // end query formation

        msgConsole = "---READING GUILD: " + guildToUpdate;
        msgDiscord = "Reading guild: `" + guildToUpdate + "`";
        // log messages to both Discord log channel and Console
        fileUtils.logBotToDiscordAndConsole(client, message, args, Discord, msgDiscord, msgConsole);

        var gData;

        gData = await GuildData.findOne(query, (error, guildData) => {
            if (error) {
                console.log("---GUILDDATA FIND BY ID ERROR: ", error);
                return;
            } 
        }); // end await GuildData.fineOne
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

        var guildEmbed = await updateEmbed(
            gName, leader, members, localGP, dailyTickets,
            hothDS, hothLS,
            geoDS, watShards,
            geoLS, kamShards,
            hpit, haat, hstr, cpit,
            guildGG, updatedText)

        await sendToJCR(guildEmbed);
        await sendToMain(guildEmbed);
        await sendToRecruiting(guildEmbed);

        // log messages to both Discord log channel and Console
        msgConsole = "---FINISHED SENDING UPDATED TO ALL CHANNELS";
        msgDiscord = "Finished sending update to all channels";
        fileUtils.logBotToDiscordAndConsole(client, message, args, Discord, msgDiscord, msgConsole);

        return true;


        // function updateEmbed(
        //     gName, leader, members, localGP, dailyTickets,
        //     hothDS, hothLS,
        //     geoDS, watShards,
        //     geoLS, kamShards,
        //     hpit, haat, hstr, cpit,
        //     guildGG, updatedText) {
        //     return new Promise(async (resolve, reject) => {

        //         var guildEmbed = globalVar.phantomBotGuilds
        //         // .setTitle("THE PHANTOM ALLIANCE GUILD INFO")
        //         guildEmbed.description = '**' + gName + '**';
        //         guildEmbed.fields[0] = {
        //             name: 'GUILD INFORMATION',
        //             value: 'LEADER: `' + leader + '`\n' +
        //                 'MEMBERS `' + members + '/50` \n' +
        //                 'GP: `' + localGP + '`\n' +
        //                 'Daily Tickets: `' + dailyTickets + '`'
        //         }
        //         guildEmbed.fields[1] = {
        //             name: 'TERRITORY BATTLES',
        //             value: 'HOTH DS: `' + hothDS + '`⭐️\n' +
        //                 'HOTH LS: `' + hothLS + '`⭐️ \n' +
        //                 'GEO DS: `' + geoDS + '`⭐️ with `' + watShards + '` <:watshard:709573349579161705>\n' +
        //                 'GEO LS: `' + geoLS + '`⭐️ with `' + kamShards + '` <:kam:778266623172673536>'
        //         }
        //         guildEmbed.fields[2] = {
        //             name: 'RAIDS',
        //             value: 'HPIT: `' + hpit + '`\n' +
        //                 'HAAT: `' + haat + '`\n' +
        //                 'HSTR: `' + hstr + '`\n' +
        //                 'CPIT: `' + cpit + '`'
        //         }
        //         guildEmbed.fields[3] = {
        //             name: 'SWGOH.GG LINK',
        //             value: guildGG
        //         }
        //         guildEmbed.fields[4] = {
        //             name: 'INFO LAST UPDATED',
        //             value: '`' + updatedText + '`'
        //         }
        //         console.log('------EMBED DATA FOR ' + gName + ' IS NOW SET');
        //         // console.log('------SEEING IF THIS GLOB VAR IS SET: ', globalVar.serverIDs.jcrServerID);
        //         resolve(guildEmbed);
        //     });

        // }; // end async function updateEmbed

        // async function sendToJCR(gldEmb) {
        //     return new Promise(resolve => {
        //         (async () => {
        //             const result = await sendEmbed(globalVar.serverIDs.jcrServerChannelID, jcrServerMsgID, gldEmb)
        //             resolve(console.log(result + ' TO JCR SERVER'));
        //         })();
        //     });

        // };

        // async function sendToRecruiting(gldEmb) {
        //     return new Promise(resolve => {
        //         (async () => {
        //             const result = await sendEmbed(globalVar.serverIDs.recruitingServerChannelID, recruitingServerMsgID, gldEmb);
        //             resolve(console.log(result + ' TO RECRUITING SERVER'));
        //         })();
        //     });

        // };

        // async function sendToMain(gldEmb) {
        //     return new Promise(resolve => {
        //         (async () => {
        //             const result = await sendEmbed(globalVar.serverIDs.mainServerChannelID, mainServerMsgID, gldEmb);
        //             resolve(console.log(result + ' TO MAIN SERVER'));
        //         })();
        //     });

        // };

        // function sendEmbed(chID, msgID, gldEmb) {
        //     return new Promise(resolve => {

        //         (async () => {
        //             // console.log('---chID : msgID', chID, msgID);
        //             await client.channels.cache.get(chID).messages.fetch(msgID).then(msg => msg.edit(gldEmb));
        //             // await guild.channels.cache.get(chID).messages.fetch(msgID).then(msg => msg.edit(gldEmb));
        //             resolve('------SENT EMBED');
        //         })();

        //     });
        // }
    })();
} // end updateOneEmbed()

function updateEmbed(
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
        console.log('------EMBED DATA FOR ' + gName + ' IS NOW SET');
        // console.log('------SEEING IF THIS GLOB VAR IS SET: ', globalVar.serverIDs.jcrServerID);
        resolve(guildEmbed);
    });

}; // end function updateEmbed

async function sendToJCR(gldEmb) {
    return new Promise(resolve => {
        (async () => {
            const result = await sendEmbed(globalVar.serverIDs.jcrServerChannelID, jcrServerMsgID, gldEmb)
            resolve(console.log(result + ' TO JCR SERVER'));
        })();
    });

};

async function sendToRecruiting(gldEmb) {
    return new Promise(resolve => {
        (async () => {
            const result = await sendEmbed(globalVar.serverIDs.recruitingServerChannelID, recruitingServerMsgID, gldEmb);
            resolve(console.log(result + ' TO RECRUITING SERVER'));
        })();
    });

};

async function sendToMain(gldEmb) {
    return new Promise(resolve => {
        (async () => {
            const result = await sendEmbed(globalVar.serverIDs.mainServerChannelID, mainServerMsgID, gldEmb);
            resolve(console.log(result + ' TO MAIN SERVER'));
        })();
    });

};

function sendEmbed(chID, msgID, gldEmb) {
    return new Promise(resolve => {

        (async () => {
            // console.log('---chID : msgID', chID, msgID);
            await client.channels.cache.get(chID).messages.fetch(msgID).then(msg => msg.edit(gldEmb));
            // await guild.channels.cache.get(chID).messages.fetch(msgID).then(msg => msg.edit(gldEmb));
            resolve('------SENT EMBED');
        })();

    });
}





//shows these functions to the outside world
module.exports = {
    getGuildUpdates,
    updateGuildEmbeds,
    updateOneEmbed
    

};
