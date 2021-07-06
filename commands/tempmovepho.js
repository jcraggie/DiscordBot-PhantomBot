module.exports = {
    name: 'tempmovepho',
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

        // phoundlingsInfo
        const query = '60dc856a0572f4e54c08bf7c';
        const update = {  $set: {
            dailyTickets: globalVar.phoundlingsInfo.dailyTickets,
            ticketReset: globalVar.phoundlingsInfo.ticketReset,
            hothDS: globalVar.phoundlingsInfo.hothDS,
            hothLS: globalVar.phoundlingsInfo.hothLS,
            geoDS: globalVar.phoundlingsInfo.geoDS,
            watShards: globalVar.phoundlingsInfo.watShards,
            geoLS: globalVar.phoundlingsInfo.geoLS,
            kamShards: globalVar.phoundlingsInfo.kamShards,
            haat: globalVar.phoundlingsInfo.haat,
            hpit: globalVar.phoundlingsInfo.hpit,
            hstr: globalVar.phoundlingsInfo.hstr,
            cpit: globalVar.phoundlingsInfo.cpit,
            guildGG: globalVar.phoundlingsInfo.guildGG,
            mainServerMsgID: globalVar.phoundlingsInfo.mainServerMsgID,
            recruitingServerMsgID: globalVar.phoundlingsInfo.recruitingServerMsgID,
            jcrServerMsgID: globalVar.phoundlingsInfo.jcrServerMsgID

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