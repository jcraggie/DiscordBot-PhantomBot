module.exports = {
    // pb.updateguild rebellion geoDS 14 

    name: 'updateguild',
    description: "Updates a guild\'s TB/raid numbers",
    async execute(client, message, args, Discord){
            var globalVar = require('../global.js');
            var fileUtils = require('../fileHelper.js');
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
            var gName = args[0].toLowerCase();
            if (!globalVar.allianceGuildNames.includes(gName)){
                message.channel.send("That guild does not exist");
                console.log(`${message.author.username} (${message.author.id}) tried to update a guild that does not exist.`);
                return;
            }

            const mongoose = require('mongoose');
            const GuildData = require('../models/GuildData');
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

            var updateField = args[1];

            fieldName = updateField;
            fieldValue = args[2];
            updateGuild = {};

            switch (updateField){
                case "cpit" : updateGuild = {$set: {cpit: fieldValue}}; break;
                case "geoDS" : updateGuild = {$set: {geoDS: fieldValue}}; break;
                case "geoLS" : updateGuild = {$set: {geoLS: fieldValue}}; break;
                case "haat" : updateGuild = {$set: {haat: fieldValue}}; break;
                case "hothDS" : updateGuild = {$set: {hothDS: fieldValue}}; break;
                case "hothLS" : updateGuild = {$set: {hothLS: fieldValue}}; break;
                case "hpit" :  updateGuild = {$set: {hpit: fieldValue}}; break;
                case "hstr" : updateGuild = {$set: {hstr: fieldValue}}; break;
                case "kamShards" : updateGuild = {$set: {kamShards: fieldValue}}; break;
                case "watShards" : updateGuild = {$set: {watShards: fieldValue}}; break;
                default : 
                    message.channel.send("That is not a valid field to update");
                    console.log(`${message.author.username} (${message.author.id}) tried to update a guild that does not exist.`);
                    return;
            }

            const options = {
                //upsert: true,
                useFindAndModify: false
            };

            const result = await gData.updateOne(query, update, options, (error, guilddata) => {
                console.log(error, guilddata);
            })
            break;

            
            
            var serverRoles = [
                ["member", "418011699698991105", "605084960130334772", "116902168698683398"], // jcrAggie server
                ["tester", "595663414756376600", "605085107673366538", "116902168698683398"], // jcrAggie server
                ["Royal Guards", "485783034961068042", "485783034961068042", "484508095469584384"], // Recruiting server
                ["Rebellion", "483620584861859850", "483620171190239280", "483433483109138433"], // rebellion
                ["Empire", "485169730097774612", "485171060132544534", "483433483109138433"],
                ["Havoc", "586291147169857556", "586361048202870804", "483433483109138433"],
                ["Rogue", "581166616872747018", "581167458979807262", "483433483109138433"],
                ["Order", "602674687771934742", "602751440213245972", "483433483109138433"],
                ["Uprising", "603261421857538049", "603265635207872522", "483433483109138433"],
                ["Lotus", "777877441061453835", "777878346041524244","483433483109138433"], // lotus added 2020-11-18 by JCR
                ["Phoundlings", "835533787071774770", "835541163649662976","483433483109138433"], // phoundlings added 2021-05-22 by JCR
                ["Hope", "853630990962130975", "853632841920938004","483433483109138433"] // hope added 2021-06-13 by JCR
            ]

            if (botID.hasPermission("MANAGE_NICKNAMES") && botID.hasPermission("CHANGE_NICKNAME")) {
                //message.channel.send("I have permission.... attempting now....");
                var roleFound = false; 
                for (var x = 0; x < serverRoles.length; x++) {
                    if(memGuild.toLowerCase() == serverRoles[x][0].toLowerCase()) {
                    roleFound = true;
                    var memRoleArray = [serverRoles[x][1]];
                    memGuild = serverRoles[x][0];
                    var memNewNick = memName + " {" + memGuild + "}";

                    message.guild.members.cache.get(taggedUser.id).roles.add(memRoleArray);
        
                    }
                }
                if (roleFound == false) {
                    message.channel.send("That role was not found:  " + args.length);
                    return;
                } else {
                    message.guild.members.cache.get(taggedUser.id).setNickname(memNewNick);
                    console.log('---NEW NICKNAME: ', memNewNick);
                    //return;
                }
                } else {
                    message.channel.send("I dont have the permissons to change my nickname in this server.");
                }

            
            
                var globalVar = require('../global.js');
                let newMemberEmbed = globalVar.phantomBotHelp
                .setTitle('WELCOME TO THE PHANTØM ALLIANCE!')
                .setDescription(" ")
                .addFields(                
                    {name: 'PLAYER NAME', value: memName},
                    {name: 'GUILD', value: 'Phantøm ' + memGuild},
                    {name: 'DISCORD NAME', value: memNewNick}
                )

                message.channel.send(newMemberEmbed);
                newMemberEmbed.fields=[] //clear the fields for the next use
            
                //log the event to Discord (jcrAggie server) and the console
                    fileUtils.logToDiscordAndConsole(client, message, args, Discord);

                
        

    
            }


}
