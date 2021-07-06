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

        // hopeInfo
        const query = '60dc856a0572f4e54c08bf7c';
        const update = {  $set: {
            dailyTickets: globalVar.hopeInfo.dailyTickets,
            ticketReset: globalVar.hopeInfo.ticketReset,
            hothDS: globalVar.hopeInfo.hothDS,
            hothLS: globalVar.hopeInfo.hothLS,
            geoDS: globalVar.hopeInfo.geoDS,
            watShards: globalVar.hopeInfo.watShards,
            geoLS: globalVar.hopeInfo.geoLS,
            kamShards: globalVar.hopeInfo.kamShards,
            haat: globalVar.hopeInfo.haat,
            hpit: globalVar.hopeInfo.hpit,
            hstr: globalVar.hopeInfo.hstr,
            cpit: globalVar.hopeInfo.cpit,
            guildGG: globalVar.hopeInfo.guildGG,
            mainServerMsgID: globalVar.hopeInfo.mainServerMsgID,
            recruitingServerMsgID: globalVar.hopeInfo.recruitingServerMsgID,
            jcrServerMsgID: globalVar.hopeInfo.jcrServerMsgID

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