module.exports = {
    name: 'tempmovereb',
    description: "description of the new command",
    async execute(client, message, args, Discord,swapi, ApiSwgohHelp){
        const mongoose = require('mongoose');
        const GuildData = require('./commands/models/GuildData');
        const globalVar = require ('../../global.js');


        mongoose.connect(process.env.MONGO_GUILDDATA_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
            if (err)
                console.error(err);
            else
                console.log("---CONNECTED TO THE MONGODB: GuildData"); 
                // if(!isCron) message.channel.send('Connected to JCR\'s mongoDB: GuildData');
                client.channels.cache.get(globalVar.discordChannels.log).send('Connected to JCR\'s mongoDB: GuildData');
        }); // end mongoose connect

        // rebellionInfo
        const query = '60dc856a0572f4e54c08bf7b';
        const update = {  $set: {
            dailyTickets: globalVar.rebellionInfo.dailyTickets,
            ticketReset: globalVar.rebellionInfo.ticketReset,
            hothDS: globalVar.rebellionInfo.hothDS,
            hothLS: globalVar.rebellionInfo.hothLS,
            geoDS: globalVar.rebellionInfo.geoDS,
            watShards: globalVar.rebellionInfo.watShards,
            geoLS: globalVar.rebellionInfo.geoLS,
            kamShards: globalVar.rebellionInfo.kamShards,
            haat: globalVar.rebellionInfo.haat,
            hpit: globalVar.rebellionInfo.hpit,
            hstr: globalVar.rebellionInfo.hstr,
            cpit: globalVar.rebellionInfo.cpit,
            guildGG: globalVar.rebellionInfo.guildGG,
            mainServerMsgID: globalVar.rebellionInfo.mainServerMsgID,
            recruitingServerMsgID: globalVar.rebellionInfo.recruitingServerMsgID,
            jcrServerMsgID: globalVar.rebellionInfo.jcrServerMsgID

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