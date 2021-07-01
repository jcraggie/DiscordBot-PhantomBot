module.exports = {
    name: 'mongoupdatereb',
    description: "description of the new command",
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
        
        // _id:60dbb1c8d9d9a0038a9f3a41 = Rebellion jcr laptop local
        // _id:60dc739f1af6d175fd69cba8 = Rebellion online MongoDB Atlas

        const gData = await GuildData.findByIdAndUpdate('60dc739f1af6d175fd69cba8', {
            //data updates go here
            leader: 'zibby bonehead',
            members: 49

        }, (error, guilddata) => {
            console.log(error, guilddata)
            ;
        })

        console.log('---test');
        console.log(gData['name']);
        message.channel.send(`Name: \`${gData['name']}\``);
        message.channel.send(`Leader: \`${gData['leader']}\``);

        
        const globalVar = require ('../global.js');
        var fileUtils = require('../fileHelper.js');
        // message.channel.send('createmongodblocal');
        
        //log the event to Discord (jcrAggie server) and the console
        fileUtils.logToDiscordAndConsole(client, message, args, Discord);


    }//end async execute

}//end module.exports