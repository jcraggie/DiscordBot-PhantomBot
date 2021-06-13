module.exports = {
    name: 'getrogue',
    description: "reads in the Rogue json file",
    async execute(client, message, args, Discord,swapi, ApiSwgohHelp){

        const guildFilePath = './guilds/';
        const guildList = [];
       
        const guildToRead = './guilds/g_04_rogue.json';

        const fs = require('fs');
        
        fs.readFile(guildToRead, 'utf8', (err, jsonString) => {
            if (err) {
                console.log('---FILE READ FAILED: ', err);
                return;
            }

            try {
                const guildData = JSON.parse(jsonString); //change JSON file to an object
                console.log(guildData.name, ': ', guildData.members, '  GP: ', guildData.gp, ' Updated: ',guildData.updated);

                var dateConvert = new Date(guildData.updated + 1000); //convert epoch timestamp to date and time
                var localDate = dateConvert.toLocaleString(); //convert date and time to local
                var localGP = guildData.gp.toLocaleString("en-US"); //add commas to GP

                var globalVar = require('../global.js');
                let guildEmbed = globalVar.phantomBotHelp
                .setTitle("THE PHANTOM ALLIANCE GUILD INFO")
                .setDescription(" ")
                .addFields(
                    {name: guildData.name, value: 'MEMBERS: `' + guildData.members + '` GP: `'+ localGP + '`\nUpdated: `' + localDate + '`'},
                    {name: '\u200B', value: '\u200B' }
                ) //end .addFields

                message.channel.send(guildEmbed);
                guildEmbed.fields=[] //clear the fields for the next use

                //log the event to jcrAggie server #phantom-ready channel
                let msg = '`' + message.author.username + '` in #`'+ message.channel.name + '` sent: `' + message.content +'`';
                client.channels.cache.get('605087450573963362').send(msg);
                
                //log the event to the console
                console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);

            }//end try 
            catch (err) {
                console.log('---ERROR PARSING JSON STRING: ', err);

            }//end catch
        
        })//end fs.readFile

    }//end async execute

}//end module.exports