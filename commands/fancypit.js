// 483778511673491457 Rebellion #raids channel
// 483620584861859850 Phantom Rebellion role ID (members)


module.exports = {
    name: 'fancypit',
    description: "Sends and alert the next Fancy Pit phase is ready.",
    
    async execute(client, message, args, Discord){

        let globalVar = require('../global.js');
        var fileUtils = require('../helpers/fileHelper');

        //log the event to Discord (jcrAggie server) and the console
        fileUtils.logToDiscordAndConsole(client, message, args, Discord);

        // CHECKING PERMISSIONS TO USE THIS COMMAND
        var permUtils = require('../helpers/permissions');
        var allowTheseRoles = [
            'Officer-Rebellion',
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

        let fancyPitTitle = "REBELLION FANCY PIT";
        let fancyPitGuildRole = '<@&483620584861859850>';
        let fancyPitDescription = fancyPitGuildRole + ': The next Fancy Pit phase is open!';
        let fancyPitTypicalTeamsField = 'TYPICAL TEAMS';
        let fancyPitTeams = '\u200b';
        let fancyPitGoalField = 'GOAL %';
        let fancyPitGoalPercentage = '\u200b';

        //temp for testing bot only so it will not ping the guild
        //fancyPitGuildRole = '@ Phantom Rebellion';
        
        switch(args[0]){
            case 'help':
            
                //var globalVar = require('../global.js');
                let fancyPitHelpEmbed = globalVar.phantomBotHelp
                .setTitle(fancyPitTitle + "HELP")
                .setDescription("**COMMAND: **  " + '`pb.'+this.name+'`')
                .addFields(                
                    {name: 'DESCRIPTION', value: this.description},
                    {name: 'PHASE #', value: "`pb.fancypit <1-4>`"},
                    {name: 'EXAMPLE', value: "`pb.fancypit 2` = notification for Fancy Pit Phase 2"},
                    {name: 'DMG', value: "`pb.fancypit dmg` Displays a chart of damage by phase."},
                    {name: 'DEFAULT', value: "`pb.fancypit` results in a generic message: Next phase is open!"},
                    {name: 'NOTE', value: "Only Rebellion Officers can run this command."},
                    {name: '\u200B', value: '\u200B' }
            
                    ) // end addFields

                    message.channel.send(fancyPitHelpEmbed);
                    fancyPitHelpEmbed.fields=[] //clear the fields for the next use


                    //log the event to Discord (jcrAggie server) and the console
                    fileUtils.logToDiscordAndConsole(client, message, args, Discord);

                return; //case help
            
            case '1':    

                fancyPitDescription = fancyPitGuildRole + ': Fancy Pit Phase 1 is open!';
                fancyPitTeams = 'Phase 1 teams';
                fancyPitGoalPercentage = '4%';
                break; //case 1
                
            case '2':

                fancyPitDescription = fancyPitGuildRole + ': Fancy Pit Phase 2 is open!';
                fancyPitTeams = 'Phase 2 teams';
                fancyPitGoalPercentage = '4%';
                break; //case 2

            case '3':

                fancyPitDescription = fancyPitGuildRole + ': Fancy Pit Phase 3 is open!';
                fancyPitTeams = 'Phase 3 teams';
                fancyPitGoalPercentage = '4%';
                break; //case 3

            case '4':

                fancyPitDescription = fancyPitGuildRole + ': Fancy Pit Phase 4 is open!';
                fancyPitTeams = 'Phase 4 teams';
                fancyPitGoalPercentage = '4%';
                break; //case 4

            case 'dmg':
                let fancyPitDmgImg = new Discord.MessageAttachment('./graphics/FancyPit_damage.png');
                let fancyPitImageEmbed = globalVar.fancyPitImageEmbed
                .setDescription('Here is the damage by phase')
                .attachFiles(fancyPitDmgImg)
                .setImage('attachment://FancyPit_damage.png')

                message.channel.send(fancyPitImageEmbed);
                fancyPitImageEmbed.fields=[]; //clear the fields for the next use
        
                //log the event to Discord (jcrAggie server) and the console
                fileUtils.logToDiscordAndConsole(client, message, args, Discord);
                return;

            case 'next':

                fancyPitDescription = fancyPitGuildRole + ': The next Fancy Pit phase is open!';
                fancyPitTeams = ':thinking: ';
                fancyPitGoalPercentage = 'As much as you can! :) ';
                break; //undefined

            default:
                
                message.channel.send('Sorry that is not valid...');
                return;
                            
            } //end of switch


            //var globalVar = require('../global.js');
            let fancyPitHelpEmbed = globalVar.phantomBotHelp
            .setTitle(fancyPitTitle)
            .setDescription(fancyPitDescription)
            .addFields(                
                 {name: fancyPitTypicalTeamsField, value: fancyPitTeams},
                 {name: fancyPitGoalField, value: fancyPitGoalPercentage},
          
                 {name: '\u200B', value: '\u200B' }
           
                ) //end of addFields
            
                message.channel.send(fancyPitHelpEmbed);
                fancyPitHelpEmbed.fields=[] //clear the fields for the next use
        
                

            } //end async execute

            
    } //end module exports
    

