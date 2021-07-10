module.exports = {
    name: 'newmember',
    description: "Assigns a new member to a guild and updates their nickname",
    async execute(client, message, args, Discord){
        var globalVar = require('../global.js');
        var fileUtils = require('../fileHelper.js');

        //log the event to Discord (jcrAggie server) and the console
        fileUtils.logToDiscordAndConsole(client, message, args, Discord);

        // CHECKING PERMISSIONS TO USE THIS COMMAND
        var permUtils = require('../helpers/permissions');
        var allowTheseRoles = [
            'admin',
            'Admin',
            'Royal Guards',
            'Recruiter'
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

        function sendNewMemberHelp() {
            
            let newMemberHelpEmbed = globalVar.phantomBotHelp
            .setTitle("PhantomBot Help")
            .setDescription("**COMMAND: **" + '`' + module.exports.name + '`')
            .addFields(                
                {name: 'DESCRIPTION', value: module.exports.description},
                {name: 'USAGE', value: "`pb.newmember @discord Guildname In-game-name`"},
                {name: 'EXAMPLE', value: "`pb.newmember @jcraggie Rebellion Mando Lorian`"},
                {name: '\u200B', value: '\u200B' }
                
            )
            message.channel.send(newMemberHelpEmbed);
            newMemberHelpEmbed.fields=[] //clear the fields for the next use

        } // end function sendNewMemberHelp
        if (args[0] == "help"){
            sendNewMemberHelp();

            //log the event to Discord (jcrAggie server) and the console
            fileUtils.logToDiscordAndConsole(client, message, args, Discord);

        } else {
            var memDiscName = args[0];
            var memName = args.slice(2).join(' ');
            if(!memName || memName == "" || memName == " ") {
              message.channel.send('That appears to be incorrect.');
              sendNewMemberHelp();
              return;
            }
            var memGuild = args[1];
            //var memNewNick = memName + " {" + memGuild + "}";
            const taggedUser = message.mentions.users.first();
            const botID = message.guild.members.cache.get("845343252793786418");

            memName.trim();
            memGuild.trim();
            //if(memOfficer) memOfficer.trim();
            
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

              } // end else
        

    
            }


}
