// 483778511673491457 Rebellion #raids channel
// 483620584861859850 Phantom Rebellion role ID (members)


module.exports = {
    name: 'fancypit',
    description: "Sends and alert the next Fancy Pit phase is ready.",
    
    async execute(client, message, args, Discord){

        // Phantøm Rebellion - role name

        var allowedRoles = [
            
            'Officer-Rebellion'
    
        ]
    
        var hasRole = false;
        allowedRoles.forEach(findrole => {
            if(message.member.roles.cache.some(role =>role.name === findrole)) hasRole = true;
            
        })
    
        if(!hasRole){
            message.reply("Sorry you don't have permissions to use that command.");
            return;
        } else {
            //message.reply("You have permission to run this command. Proceed.");
            
        }




        let fancyPitTitle = "REBELLION FANCY PIT";
        let fancyPitGuildRole = '<@&483620584861859850>';
        let fancyPitDescription = fancyPitGuildRole + ': The next Fancy Pit phase is open!';
        let fancyPitTypicalTeamsField = 'TYPICAL TEAMS';
        let fancyPitTeams = ' ';
        let fancyPitGoalField = 'GOAL %';
        let fancyPitGoalPercentage = ' ';
        //temp
        //fancyPitGuildRole = '@ Phantom Rebellion';
        if (args[0] == "help"){
            //message.channel.send('HELP for ` -invite ` is not implemented yet. This is the way.');

            var globalVar = require('../global.js');
            //let fancyPitTitle = "PhantomBot Help";
            
            

            let fancyPitHelpEmbed = globalVar.phantomBotHelp
            
            .setTitle(fancyPitTitle)
            .setDescription("**COMMAND: **  " + '`pb.'+this.name+'`')
            .addFields(                
                {name: 'DESCRIPTION', value: this.description},
                {name: 'USAGE', value: "`pb.fancypit <1-4>`"},
                {name: 'EXAMPLE', value: "`pb.fancypit 2` = noticiation for Fancy Pit Phase 2"},
                {name: 'DEFAULT', value: "`pb.fancypit` results in a generic message: Next phase is open!"},
                {name: '\u200B', value: '\u200B' }
            )
    
            //.setFooter(phantomBotHelp.Footer);
            
            
            
            message.channel.send(fancyPitHelpEmbed);
            fancyPitHelpEmbed.fields=[] //clear the fields for the next use

            //log the event to jcrAggie server #phantom-ready channel
            let msg = '`' + message.author.username + '` in #`'+ message.channel.name + '` sent: `' + message.content +'`';
            client.channels.cache.get('605087450573963362').send(msg);
            
            //log the event to the console
            console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);


        } else {
            

            if (args[0] == "1"){
                fancyPitDescription = fancyPitGuildRole + ': Fancy Pit Phase 1 is open!';
                fancyPitTeams = 'Phase 1 teams';
                fancyPitGoalPercentage = '4%';
            } else {
                if(args[0] == '2'){
                    fancyPitDescription = fancyPitGuildRole + ': Fancy Pit Phase 2 is open!';
                    fancyPitTeams = 'Phase 2 teams';
                    fancyPitGoalPercentage = '4%';
                } else {
                    if(args[0] == '3'){
                        fancyPitDescription = fancyPitGuildRole + ': Fancy Pit Phase 3 is open!';
                        fancyPitTeams = 'Phase 3 teams';
                        fancyPitGoalPercentage = '4%';
                    } else {
                        if(args[0] == '4'){
                            fancyPitDescription = fancyPitGuildRole + ': Fancy Pit Phase 4 is open!';
                            fancyPitTeams = 'Phase 4 teams';
                            fancyPitGoalPercentage = '4%';
                        } else {
                            if(args[0] == undefined){
                                fancyPitDescription = fancyPitGuildRole + ': The next Fancy Pit phase is open!';
                                fancyPitTeams = ':thinking: ';
                                fancyPitGoalPercentage = 'As much as you can! :) ';
                            } else {
                                message.channel.send('Sorry that is not valid...');
                                return;
                            }

                        }
                    }
                }

            }

            var globalVar = require('../global.js');
            let fancyPitHelpEmbed = globalVar.phantomBotHelp
            .setTitle(fancyPitTitle)
            .setDescription(fancyPitDescription)
            .addFields(                
                 {name: fancyPitTypicalTeamsField, value: fancyPitTeams},
                 {name: fancyPitGoalField, value: fancyPitGoalPercentage},
          
                 {name: '\u200B', value: '\u200B' }
           
                )
            
                    //.setFooter(phantomBotHelp.Footer);
                    
                    
                    
           
                    message.channel.send(fancyPitHelpEmbed);
                    fancyPitHelpEmbed.fields=[] //clear the fields for the next use
        
                    //log the event to jcrAggie server #phantom-ready channel
                    let msg = '`' + message.author.username + '` in #`'+ message.channel.name + '` sent: `' + message.content +'`';
                    client.channels.cache.get('605087450573963362').send(msg);
                    
                    //log the event to the console
                    console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);



        } // end elses
                
         
    
        
    }
    
}
