module.exports = {
  name: 'newmember',
  description: "Assigns a new member to a guild and updates their nickname",
  async execute(client, message, args, Discord){
      if (args[0] == "help"){
          var globalVar = require('../global.js');
          let newMemberHelpEmbed = globalVar.phantomBotHelp
          .setTitle("PhantomBot Help")
          .setDescription("**COMMAND: **" + this.name)
          .addFields(                
              {name: 'DESCRIPTION', value: this.description},
              {name: 'USAGE', value: "`pb.newmember @discord Guildname In-game-name`"},
              {name: 'EXAMPLE', value: "`pb.newmember @jcraggie Rebellion Mando Aggie`"}
              
          )

          message.channel.send(newMemberHelpEmbed);
          newMemberHelpEmbed.fields=[] //clear the fields for the next use

          //log the event to jcrAggie server #phantom-ready channel
          let msg = '`' + message.author.username + '` in #`'+ message.channel.name + '` sent: `' + message.content +'`';
          client.channels.cache.get('605087450573963362').send(msg);
            
          //log the event to the console
          console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);


      } else {
          var memDiscName = args[0];
          var memName = args.slice(2).join(' ');
          var memGuild = args[1];
          var memNewNick = memName + " {" + memGuild + "}";
          const taggedUser = message.mentions.users.first();
            const botID = message.guild.members.cache.get("594193472336953365");

            memName.trim();
            memGuild.trim();
            //if(memOfficer) memOfficer.trim();

            // role name, guild role ID, guild officer role ID, server ID
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
                  if(memGuild == serverRoles[x][0]) {
                    roleFound = true;
                    var memRoleArray = [serverRoles[x][1]];

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

            
          
                var globalVar = require('../global.js');
                let newMemberEmbed = globalVar.phantomBotHelp
                .setTitle('WELCOME TO THE PHANTOM ALLIANCE!')
                .setDescription(" ")
                .addFields(                
                    {name: 'PLAYER NAME', value: memName},
                    {name: 'GUILD', value: memGuild},
                    {name: 'DISCORD NAME', value: memNewNick}
                )

                message.channel.send(newMemberEmbed);
                newMemberEmbed.fields=[] //clear the fields for the next use
            
                //log the event to jcrAggie server #phantom-ready channel
                let msg = '`' + message.author.username + '` in #`'+ message.channel.name + '` sent: `' + message.content +'`';
                client.channels.cache.get('605087450573963362').send(msg);
                
                //log the event to the console
                console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);  

              } // end else
        

    
            }


}
