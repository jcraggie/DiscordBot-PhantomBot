module.exports = {
    name: 'tempmovehav',
    description: "temp cmd to move reb globals to mongoDB",
    async execute(client, message, args, Discord,swapi, ApiSwgohHelp){
        const mongoose = require('mongoose');
        const GuildData = require('./models/GuildData');
        const globalVar = require ('../global');


        mongoose.connect(process.env.MONGO_GUILDDATA_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
            if (err)
                console.error(err);
            else
                console.log("---CONNECTED TO THE MONGODB: GuildData"); 
                // if(!isCron) message.channel.send('Connected to JCR\'s mongoDB: GuildData');
                client.channels.cache.get(globalVar.discordChannels.log).send('Connected to JCR\'s mongoDB: GuildData');
        }); // end mongoose connect

        // havocInfo
        const query = '60dc856a0572f4e54c08bf7c';
        const update = {  $set: {
            dailyTickets: globalVar.havocInfo.dailyTickets,
            ticketReset: globalVar.havocInfo.ticketReset,
            hothDS: globalVar.havocInfo.hothDS,
            hothLS: globalVar.havocInfo.hothLS,
            geoDS: globalVar.havocInfo.geoDS,
            watShards: globalVar.havocInfo.watShards,
            geoLS: globalVar.havocInfo.geoLS,
            kamShards: globalVar.havocInfo.kamShards,
            haat: globalVar.havocInfo.haat,
            hpit: globalVar.havocInfo.hpit,
            hstr: globalVar.havocInfo.hstr,
            cpit: globalVar.havocInfo.cpit,
            guildGG: globalVar.havocInfo.guildGG,
            mainServerMsgID: globalVar.havocInfo.mainServerMsgID,
            recruitingServerMsgID: globalVar.havocInfo.recruitingServerMsgID,
            jcrServerMsgID: globalVar.havocInfo.jcrServerMsgID

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