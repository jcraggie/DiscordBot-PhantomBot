// should only be used by jcrAggie


module.exports = {
    name: 'mongocreate',
    description: "use this to create a new record in the MongoDB",
    async execute(client, message, args, Discord,swapi, ApiSwgohHelp){
        const mongoose = require('mongoose');
        const GuildData = require('./models/GuildData');
        mongoose.connect(process.env.MONGO_GUILDDATA_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
            if (err)
                console.error(err);
            else
                console.log("Connected to the mongodb: GuildData"); 
                message.channel.send('Connected to the mongoDB GuildData');
        }); // end mongoose connect

        GuildData.create({
            guildAllycode: "135718294",
            fileName: "g_01_rebellion.json",
            id: "G1743793275",
            name: "PhantømRebellion",
            desc: "600/day competitive guild. Heavy focus on TB and TW!",
            leader: "zibby",
            members: 50,
            status: 2,
            required: 85,
            bannerColor: "red_white",
            bannerLogo: "guild_icon_mandalorian",
            message: "",
            gp: 269606569,
            updated: 1624706552857,
            updatedText: "6/26/2021, 6:22:33 AM"
        }, (error, GuildData) => {
            console.log(error, GuildData)
            }
        );

        // const gData = await GuildData.findById('60dbb1c8d9d9a0038a9f3a41', (error, guilddata) => {
        //     console.log(error, guilddata)
        //     ;
        // })

        // message.channel.send(gData['name']);
        // console.log('---test');
        // console.log(gData['name']);

        
        const globalVar = require ('../global.js');
        var fileUtils = require('../fileHelper.js');
        // message.channel.send('createmongodblocal');
        
        //log the event to Discord (jcrAggie server) and the console
        fileUtils.logToDiscordAndConsole(client, message, args, Discord);


    }//end async execute

}//end module.exports