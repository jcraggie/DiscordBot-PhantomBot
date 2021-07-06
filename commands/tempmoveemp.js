module.exports = {
    name: 'tempmoveemp',
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

        // empireInfo
        const query = '60dc856a0572f4e54c08bf7c';
        const update = {  $set: {
            dailyTickets: globalVar.empireInfo.dailyTickets,
            ticketReset: globalVar.empireInfo.ticketReset,
            hothDS: globalVar.empireInfo.hothDS,
            hothLS: globalVar.empireInfo.hothLS,
            geoDS: globalVar.empireInfo.geoDS,
            watShards: globalVar.empireInfo.watShards,
            geoLS: globalVar.empireInfo.geoLS,
            kamShards: globalVar.empireInfo.kamShards,
            haat: globalVar.empireInfo.haat,
            hpit: globalVar.empireInfo.hpit,
            hstr: globalVar.empireInfo.hstr,
            cpit: globalVar.empireInfo.cpit,
            guildGG: globalVar.empireInfo.guildGG,
            mainServerMsgID: globalVar.empireInfo.mainServerMsgID,
            recruitingServerMsgID: globalVar.empireInfo.recruitingServerMsgID,
            jcrServerMsgID: globalVar.empireInfo.jcrServerMsgID

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