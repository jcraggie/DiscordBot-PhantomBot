module.exports = {
    name: 'newmember',
    description: "Assigns a new member to a guild and updates their nickname",
    async execute(client, message, args, Discord, phantomBotHelp){
        if (args[0] == "help"){
            //message.channel.send('HELP for ` -invite ` is not implemented yet. This is the way.');
            let helpEmbed = phantomBotHelp
            //.setTitle("PHANTOM BOT TEST EMBED")
            //.setColor(0x580202)
            .setDescription("**COMMAND: **" + this.name)
            .addFields(                
                {name: 'DESCRIPTION', value: this.description},
                {name: 'USAGE', value: "`pb.newmember @discord Guildname In-game-name`"},
                {name: 'EXAMPLE', value: "`pb.newmember @jcraggie Rebellion Mando Aggie`"}
                
            )
    
            //.setFooter(phantomBotHelp.Footer);
    
    
            message.channel.send(helpEmbed);


        } else {
            var memDiscName = args[0];
            var memName = args.slice(2).join(' ');
            var memGuild = args[1];
            //var memOfficer = args[3];
            var memNewNick = memName + " {" + memGuild + "}";
            const taggedUser = message.mentions.users.first();
            const botID = message.guild.members.cache.get("594193472336953365");

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
                ["Phoundlings", "835533787071774770", "835541163649662976","483433483109138433"] // phoundlings added 2021-05-22 by JCR
            ]

            if (botID.hasPermission("MANAGE_NICKNAMES") && botID.hasPermission("CHANGE_NICKNAME")) {
                //message.channel.send("I have permission.... attempting now....");
                var roleFound = false; 
                for (var x = 0; x < serverRoles.length; x++) {
                  if(memGuild == serverRoles[x][0]) {
                    roleFound = true;
                    var memRoleArray = [serverRoles[x][1]];
        
                    // if(memOfficer == "officer"){
                    //   memRoleArray = [  serverRoles[x][1],serverRoles[x][2]  ];
                    // } 
                    // using setRoles([array,of,roles]) as this clears existing roles and just assigns the ones in the array.
                    
                    //message.guild.members.cache.get(taggedUser.id).setRoles(memRoleArray); 
                    message.guild.members.cache.get(taggedUser.id).roles.add(memRoleArray);
        
                  }
                }
                if (roleFound == false) {
                  message.channel.send("That role was not found:  " + args.length);
                  return;
                } else {
                  message.guild.members.cache.get(taggedUser.id).setNickname(memNewNick);
                  //return;
                }
              } else {
                  message.channel.send("I dont have the permissons to change my nickname in this server.");
                }

                let newMemberInfo = phantomBotHelp
            //.setTitle("PHANTOM BOT TEST EMBED")
            .setTitle('WELCOME TO THE PHANTOM ALLIANCE!')
            .setColor(0xac30f1)
            .setDescription(" ")
            .addFields(                
                {name: 'PLAYER NAME', value: memName},
                {name: 'GUILD', value: memGuild},
                {name: 'DISCORD NAME', value: memNewNick}
                
            )
    
            //.setFooter(phantomBotHelp.Footer);
    
    
            message.channel.send(newMemberInfo);



        } // end else
        

    }

}