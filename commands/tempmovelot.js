module.exports = {
    name: 'tempmovelot',
    description: "temp cmd to move reb globals to mongoDB",
    async execute(client, message, args, Discord,swapi, ApiSwgohHelp){
        const mongoose = require('mongoose');
        const GuildData = require('./models/GuildData');
        const globalVar = require ('../global');
        const fileUtils = require('../fileHelper');


        mongoose.connect(process.env.MONGO_GUILDDATA_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
            if (err)
                console.error(err);
            else
                console.log("---CONNECTED TO THE MONGODB: GuildData"); 
                // if(!isCron) message.channel.send('Connected to JCR\'s mongoDB: GuildData');
                client.channels.cache.get(globalVar.discordChannels.log).send('Connected to JCR\'s mongoDB: GuildData');
        }); // end mongoose connect

        // lotusInfo
        const query = '60dc856a0572f4e54c08bf81';
        const update = {  $set: {
            dailyTickets: globalVar.lotusInfo.dailyTickets,
            ticketReset: globalVar.lotusInfo.ticketReset,
            hothDS: globalVar.lotusInfo.hothDS,
            hothLS: globalVar.lotusInfo.hothLS,
            geoDS: globalVar.lotusInfo.geoDS,
            watShards: globalVar.lotusInfo.watShards,
            geoLS: globalVar.lotusInfo.geoLS,
            kamShards: globalVar.lotusInfo.kamShards,
            haat: globalVar.lotusInfo.haat,
            hpit: globalVar.lotusInfo.hpit,
            hstr: globalVar.lotusInfo.hstr,
            cpit: globalVar.lotusInfo.cpit,
            guildGG: globalVar.lotusInfo.guildGG,
            mainServerMsgID: globalVar.lotusInfo.mainServerMsgID,
            recruitingServerMsgID: globalVar.lotusInfo.recruitingServerMsgID,
            jcrServerMsgID: globalVar.lotusInfo.jcrServerMsgID

            }  
        };
        const options = {
            //upsert: true,
            useFindAndModify: false
        };

        const gData = await GuildData.findByIdAndUpdate(query, update, options, (error, guilddata) => {
            console.log(error, guilddata);
        });

        
        //log the event to Discord (jcrAggie server) and the console
        fileUtils.logToDiscordAndConsole(client, message, args, Discord);


    }//end async execute

}//end module.exports