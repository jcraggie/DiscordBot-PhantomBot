module.exports = {
    name: 'tempmoverog',
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

        // rogueInfo
        const query = '60dc856a0572f4e54c08bf7e';
        const update = {  $set: {
            dailyTickets: globalVar.rogueInfo.dailyTickets,
            ticketReset: globalVar.rogueInfo.ticketReset,
            hothDS: globalVar.rogueInfo.hothDS,
            hothLS: globalVar.rogueInfo.hothLS,
            geoDS: globalVar.rogueInfo.geoDS,
            watShards: globalVar.rogueInfo.watShards,
            geoLS: globalVar.rogueInfo.geoLS,
            kamShards: globalVar.rogueInfo.kamShards,
            haat: globalVar.rogueInfo.haat,
            hpit: globalVar.rogueInfo.hpit,
            hstr: globalVar.rogueInfo.hstr,
            cpit: globalVar.rogueInfo.cpit,
            guildGG: globalVar.rogueInfo.guildGG,
            mainServerMsgID: globalVar.rogueInfo.mainServerMsgID,
            recruitingServerMsgID: globalVar.rogueInfo.recruitingServerMsgID,
            jcrServerMsgID: globalVar.rogueInfo.jcrServerMsgID

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