module.exports = {
    // pb.updateguild rebellion geoDS 14 
    //           args    0        1   2 

    name: 'updateguild',
    description: "Updates a guild\'s TB/raid numbers",
    async execute(client, message, args, Discord){
        var globalVar = require('../global.js');
        var fileUtils = require('../helpers/fileHelper');
        var mongoUtils = require('../helpers/mongoHelper');

        //log the event to Discord (jcrAggie server) and the console
        fileUtils.logToDiscordAndConsole(client, message, args, Discord);

        // CHECKING PERMISSIONS TO USE THIS COMMAND
        var permUtils = require('../helpers/permissions');
        var allowTheseRoles = [
            'admin',
            'Admin'
        ];
        if(!permUtils.hasPermission(client, message, Discord, allowTheseRoles)){
            var auth = message.author.username;
            msgDiscord = auth + ' does not have permission to run that command';
            msgConsole = msgDiscord;
            // log messages to both Discord log channel and Console
            fileUtils.logBotToDiscordAndConsole(client, message, args, Discord, msgDiscord, msgConsole);
            return;        
        } // end if does not have permission
        // otherwise...
        // END OF PERMISSION CHECK - CONTINUE WITH COMMAND

        function sendUpdateGuildHelp() {
        
            let newMemberHelpEmbed = globalVar.phantomBotHelp
            .setTitle("PhantomBot Help")
            .setDescription("**COMMAND: **" + '`' + module.exports.name + '`')
            .addFields(                
                {name: 'DESCRIPTION', value: module.exports.description},
                {name: 'USAGE', value: "`usage goes here`"},
                {name: 'EXAMPLE', value: "`example goes here`"},
                {name: '\u200B', value: '\u200B' }
                
            )
            message.channel.send(newMemberHelpEmbed);
            newMemberHelpEmbed.fields=[] //clear the fields for the next use

        } // end function sendNewMemberHelp
        if (args[0] == "help"){
            sendUpdateGuildHelp();


            //log the event to Discord (jcrAggie server) and the console
            fileUtils.logToDiscordAndConsole(client, message, args, Discord);
            return;

        }

        if(!args[0]){
            message.channel.send("Please specify a guild.");
            sendUpdateGuildHelp();
            return;
        }

        var gName = args[0].toLowerCase();
        if (!globalVar.allianceGuildNames.includes(gName)){
            message.channel.send("That guild does not exist");
            console.log(`${message.author.username} (${message.author.id}) tried to update a guild that does not exist.`);
            return;
        }

        const mongoose = require('mongoose');
        const GuildData = require('./models/GuildData');
        // const GuildData = require('../models/GuildData');
        mongoose.connect(process.env.MONGO_GUILDDATA_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
            if (err)
                console.error(err);
            else
                console.log("Connected to the mongodb: GuildData"); 
                message.channel.send('Connected to the mongoDB GuildData');
        }); // end mongoose connect

        // form query searching mongoDB GuildData for commonGuildName = gld
        fieldName = "commonGuildName";
        fieldValue = gName;
        query = {};
        query[fieldName] = fieldValue;
        // end query formation

        var updateField = args[1].toLowerCase();

        fieldName = updateField;
        fieldValue = args[2];
        updateGuild = {};

        switch (updateField){
            case "cpit" : updateGuild = {$set: {cpit: fieldValue}}; break;
            case "geods" : updateGuild = {$set: {geoDS: fieldValue}}; break;
            case "geols" : updateGuild = {$set: {geoLS: fieldValue}}; break;
            case "haat" : updateGuild = {$set: {haat: fieldValue}}; break;
            case "hothds" : updateGuild = {$set: {hothDS: fieldValue}}; break;
            case "hothls" : updateGuild = {$set: {hothLS: fieldValue}}; break;
            case "hpit" :  updateGuild = {$set: {hpit: fieldValue}}; break;
            case "hstr" : updateGuild = {$set: {hstr: fieldValue}}; break;
            case "kamshards" : updateGuild = {$set: {kamShards: fieldValue}}; break;
            case "watshards" : updateGuild = {$set: {watShards: fieldValue}}; break;
            default : 
                message.channel.send("That is not a valid field to update");
                console.log(`${message.author.username} (${message.author.id}) tried to update a field that does not exist.`);
                return;
        }

        const options = {
            //upsert: true,
            useFindAndModify: false
        };

        var result;
        
        result = await GuildData.updateOne(query, updateGuild, options, (error, guilddata) => {
            if (error) {
                console.error(error);
                message.channel.send("There was an error updating the guild. Please try again later.");
                return;
            }
        updatedGuild = result;
            // if (guilddata.result.ok == 0) {
                var updatedGuildName = result.name;
                console.log('---' +updatedGuildName + ' WAS UPDATED');
                message.channel.send('`' +updatedGuildName + '` was updated');

                (async () => {
                    message.channel.send('`#guild-numbers` channels updated');
                    return await mongoUtils.updateOneEmbed(client, message, args, Discord, gName);
                })();

                // return;
            // }

        })
        // return; 

    }


}
