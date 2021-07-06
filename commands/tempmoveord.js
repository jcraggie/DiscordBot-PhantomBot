module.exports = {
    name: 'tempmoveord',
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

        // orderInfo
        const query = '60dc856a0572f4e54c08bf7c';
        const update = {  $set: {
            dailyTickets: globalVar.orderInfo.dailyTickets,
            ticketReset: globalVar.orderInfo.ticketReset,
            hothDS: globalVar.orderInfo.hothDS,
            hothLS: globalVar.orderInfo.hothLS,
            geoDS: globalVar.orderInfo.geoDS,
            watShards: globalVar.orderInfo.watShards,
            geoLS: globalVar.orderInfo.geoLS,
            kamShards: globalVar.orderInfo.kamShards,
            haat: globalVar.orderInfo.haat,
            hpit: globalVar.orderInfo.hpit,
            hstr: globalVar.orderInfo.hstr,
            cpit: globalVar.orderInfo.cpit,
            guildGG: globalVar.orderInfo.guildGG,
            mainServerMsgID: globalVar.orderInfo.mainServerMsgID,
            recruitingServerMsgID: globalVar.orderInfo.recruitingServerMsgID,
            jcrServerMsgID: globalVar.orderInfo.jcrServerMsgID

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