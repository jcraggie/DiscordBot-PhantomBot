module.exports = {
    name: 'tempmoveupr',
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

        // uprisingInfo
        const query = '60dc856a0572f4e54c08bf7c';
        const update = {  $set: {
            dailyTickets: globalVar.uprisingInfo.dailyTickets,
            ticketReset: globalVar.uprisingInfo.ticketReset,
            hothDS: globalVar.uprisingInfo.hothDS,
            hothLS: globalVar.uprisingInfo.hothLS,
            geoDS: globalVar.uprisingInfo.geoDS,
            watShards: globalVar.uprisingInfo.watShards,
            geoLS: globalVar.uprisingInfo.geoLS,
            kamShards: globalVar.uprisingInfo.kamShards,
            haat: globalVar.uprisingInfo.haat,
            hpit: globalVar.uprisingInfo.hpit,
            hstr: globalVar.uprisingInfo.hstr,
            cpit: globalVar.uprisingInfo.cpit,
            guildGG: globalVar.uprisingInfo.guildGG,
            mainServerMsgID: globalVar.uprisingInfo.mainServerMsgID,
            recruitingServerMsgID: globalVar.uprisingInfo.recruitingServerMsgID,
            jcrServerMsgID: globalVar.uprisingInfo.jcrServerMsgID

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