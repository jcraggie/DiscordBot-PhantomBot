// guided by code found at https://www.yaoyuyang.com/2017/01/20/nodejs-batch-file-processing.html
// adapted and edited for PhantomBot on 2021-06-19 by JCR

// gets all guild data from the api.swgoh.help
// updates the mongoDB atlas file

// const { merge } = require('@hapi/hoek');
// const writeguilds = require('./writeguilds.js');

module.exports = {
    name: 'mongoupdateall',
    description: "combines all guild JSON files into 1 JSON file", //allguilds.json
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
        // _id:60dc739f1af6d175fd69cba8 = test section online MongoDB Atlas
        




        // var allyCodes = [135718294, 418877148, 924484782, 618277879, 993689571, 582412773, 315585918, 681711581, 166494741];
        // var allyCodes = [135718294, 418877148, 618277879]; //REBELLION EMPIRE ROGUE for testing
        var allyCodes = [135718294]; // REBELLION ONLY for testing

        console.log('---UPDATING ALL DATA USING ALLYCODES: ', allyCodes);
        const fs = require('fs');
        const fileUtils = require('../fileHelper.js');
        // const {botToken, swgohHelpUser, swgohHelpPW,swgohHelpID, swgohHelpSecret} = require(`../config`); // for local testing only
        let swgohHelpID
        let swgohHelpSecret
        // process.env.BOT_TOKEN
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
        const updatedTF = await updateDB(apiGuildData);
        console.log(updatedTF);


        async function updateDB(apiGuildData) {
            for(const gData of apiGuildData) {
                //console.log('---GDATA: \n', gData)
                var currEpoch = Math.floor(new Date().getTime()/1000.0)
                console.log('-------UPDATING MONGODB FOR: ', gData.name)
                console.log('---fetch time epoch', currEpoch)

                var dateConvert = new Date(gData.updated - (18000 * 1000)); //convert epoch timestamp to CST date and time
                var localDate = dateConvert.toLocaleString("en-US"); //convert date and time to local
                console.log('---api epoch: ', gData.updated);
                console.log('---api time text: ', localDate);

                var fetchDateConvert = new Date((currEpoch * 1000) - 180000); //convert epoch timestamp to date and time
                var fetchLocalDate = fetchDateConvert.toLocaleString("en-US"); //convert date and time to local
                console.log('---fetch time epoch', currEpoch)
                console.log('---fetch time text: ', fetchLocalDate);

                
                




                const query = {
                    "name": gData.name
                };
                const update = {  
                    "$set": {
                        "desc": gData.desc,
                        "members": gData.members,
                        "status": gData.status,
                        "required": gData.required,
                        "bannerColor": gData.bannerColor,
                        "bannerLogo": gData.bannerLogo,
                        "message": gData.message,
                        "raid": gData.raid,
                        "roster": gData.roster,
                        "gp": gData.gp,
                        "updated": gData.updated,
                        "updatedText": localDate,
                        "fetchEpoch": currEpoch,
                        "fetchText": fetchLocalDate
                    }
                };
                const options = {returnNewDocument: true,
                    useFindAndModify: false // going away in mongoose 6.0?
                
                };
                GuildData.findOneAndUpdate(query, update, options, (error, guilddata) => {
                        // console.log(error, guilddata)
                        ;
                    }).then(updatedDocument => {
                        if(updatedDocument) {
                            // console.log(`---Successfully updated document: ${updatedDocument}.`)
                        } else {
                            console.log('---No document matches the provided query.')
                        }
                    })

            } // end for
            return(true);
        } // end async function updateDB


        async function getAPIData() {
            try {
                console.log('---ACQUIRING api.swgoh.help TOKEN... PLEASE WAIT.');
                acquiredToken = await swapi.connect();

                if (!acquiredToken) throw "is null. API might be down.";
            
            }
            catch(err){
                console.log('---ACQUIRED TOKEN ERROR: ' + err);
                //return;

            }
            finally {

                console.log('---READING API DATA NOW');
                message.channel.send('Reading Guild Data from SWGOH.HELP.\nPlease be patient. This could take a few mins.');        

                console.log('---ACQUIRED TOKEN: ' , acquiredToken);
                var now = new Date(); 
                var tokenExpiry = new Date();
                tokenExpiry.setHours(tokenExpiry.getHours() + 1);
                console.log('---NOW: ',now);
                console.log('---EXPIRES AT: ', tokenExpiry);

                var apiGuildData = [];
                var fileGuildData = [];
                var newGuildData = [];

                var done = false;

                apiGuildData = await fileUtils.getNewData(client, message, args, Discord,swapi, ApiSwgohHelp, allyCodes);

                var x = 0;
                // console.log('---APIGUILDDATA\n', apiGuildData);
                return apiGuildData;

            } // end finally
        } // end async function getAPIData()


        //log the event to Discord (jcrAggie server) and the console
        fileUtils.logToDiscordAndConsole(client, message, args, Discord);
    }//end async execute
}//end module.exports