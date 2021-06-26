// guided by code found at https://www.yaoyuyang.com/2017/01/20/nodejs-batch-file-processing.html
// adapted and edited for PhantomBot on 2021-06-19 by JCR

// const { merge } = require('@hapi/hoek');
// const writeguilds = require('./writeguilds.js');

module.exports = {
    name: 'getguildapi',
    description: "combines all guild JSON files into 1 JSON file", //allguilds.json
    async execute(client, message, args, Discord,swapi, ApiSwgohHelp){
        //var allyCodes = [135718294, 418877148, 924484782, 618277879, 993689571, 582412773, 315585918, 681711581, 166494741];
        // var allyCodes = [135718294, 418877148, 618277879]; //REBELLION EMPIRE ROGUE for testing
        //console.log('---COMBINEUPDATE: Using allycodes: ', allyCodes);
        const fs = require('fs');
        const fileUtils = require('../fileHelper.js');
        // const {botToken, swgohHelpUser, swgohHelpPW,swgohHelpID, swgohHelpSecret} = require(`../config`);
        var acquiredToken = 0;

        ApiSwgohHelp = require('api-swgoh-help');
        swapi = new ApiSwgohHelp({
            "protocol":"https",
            "host":"api.swgoh.help",
            "username":process.env.SWGOH_HELP_USERNAME,
            "password":process.env.SWGOH_HELP_PASSWORD,
            "client_id":swgohHelpID,
            "client_secret":swgohHelpSecret
        });

        const apiGuildData = await getAPIData();
        
        async function getAPIData() {
            try {
                console.log('AQCUIRING TOKEN... PLEASE WAIT.');
                acquiredToken = await swapi.connect();

                if (!acquiredToken) throw "is null. API might be down.";
            
            }
            catch(err){
                console.log('---ACQUIRED TOKEN ERROR: ' + err);
                //return;

            }
            finally {

                
                message.channel.send('Reading Guild Data from SWGOH.HELP.\nPlease be patient. This could take a few mins.');        

                console.log('---ACQUIRED TOKEN: ' , acquiredToken);
                var now = new Date(); 
                var tokenExpiry = new Date();
                tokenExpiry.setHours(tokenExpiry.getHours() + 1);
                console.log('---NOW: ',now);
                console.log('---EXPIRES AT: ', tokenExpiry);

                let allyCodes = [];
                allyCodes.push(fileUtils.getAllycodeByGuildName(args[0]));

                console.log('---READING API DATA NOW FOR ' + args[0] + ' WITH ALLYCODE: ' + allyCodes);
               
                var apiGuildData = [];
                var fileGuildData = [];
                var newGuildData = [];
                var done = false;

                apiGuildData = await fileUtils.getNewData(client, message, args, Discord,swapi, ApiSwgohHelp, allyCodes);

                var x = 0;
                console.log(apiGuildData);
                return apiGuildData;

            } // end finally
        } // end async

        //log the event to Discord (jcrAggie server) and the console
        fileUtils.logToDiscordAndConsole(client, message, args, Discord);

    }//end async execute
}//end module.exports