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
        // _id:60dc739f1af6d175fd69cba8 = Rebellion online MongoDB Atlas
        




        // var allyCodes = [135718294, 418877148, 924484782, 618277879, 993689571, 582412773, 315585918, 681711581, 166494741];
        var allyCodes = [135718294, 418877148, 618277879]; //REBELLION EMPIRE ROGUE for testing
        // var allyCodes = [135718294]; // REBELLION ONLY for testing

        console.log('---COMBINEUPDATE: Using allycodes: ', allyCodes);
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

        // const query = '60dc739f1af6d175fd69cba8';
        // const update = {  $set: {leader: "zibby"}  };
        // const options = {upsert: true};

        // const gData = await GuildData.findByIdAndUpdate(query, update, options, (error, guilddata) => {
        //     console.log(error, guilddata)
        //     ;
        // });

        const apiGuildData = await getAPIData();
        const updatedTF = await updateDB(apiGuildData);
        console.log(updatedTF);


        async function updateDB(apiGuildData) {
            for(const gData of apiGuildData) {
                //console.log('---GDATA: \n', gData)
                console.log('-------UPDATING DATA FOR: \n', gData.name)
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
                        "updated": gData.updated
                    }
                };
                const options = {returnNewDocument: true};
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
                

    
    
                // update fields in mongo
                // next gData
    
            } // end for
            return(true);
        } // end async function updateDB

        // combineData(apiGuildData);

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

        // async function combineData(apiGuildData) {
        //     var mergedData=[];

        //     // make Promise version of fs.readdir()
        //     fs.readdirAsync = function(dirname) {
        //         return new Promise(function(resolve, reject) {
        //             fs.readdir(dirname, function(err, filenames){
        //                 if (err) 
        //                     reject(err); 
        //                 else 
        //                     resolve(filenames);
        //             });
        //         });
        //     };
            
        //     // make Promise version of fs.readFile()
        //     fs.readFileAsync = function(filename, enc) {
        //         return new Promise(function(resolve, reject) {
        //             fs.readFile(filename, enc, function(err, data){
        //                 if (err) 
        //                     reject(err); 
        //                 else
        //                     resolve(data);
        //             });
        //         });
        //     };
            
        //     // utility function, return Promise
        //     function getFile(filename) {
        //         let fileData = fs.readFileAsync('./guilds/' + filename, 'utf8');
        //         return fileData;
        //     }
            
            
        //     // a function to filter out the guild files 
        //     function isDataFile(filename) {
        //         return (filename.split('.')[1] == 'json' 
        //                 && filename.split('.')[0] != 'allguilds'
        //                 && filename.split('.')[0] != 'allguilds_backup')
        //     }
            
        //     // start a blank allguilds.json file
        //     fs.writeFile('./guilds/allguilds.json', '', function(){
        //             console.log('---BLANK allguilds.json FILE CREATED')
        //     });
            
            
        //     // read all json files in the directory, 
        //     //filter out those needed to process, 
        //     //and using Promise.all to time when all async readFiles has completed. 
        //     fs.readdirAsync('./guilds/').then(function (filenames){
        //         filenames = filenames.filter(isDataFile);
        //         console.log('---FILENAMES: ',filenames);
        //         return Promise.all(filenames.map(getFile));
        //     })
        //     .then(function (files){
        //         var summaryFiles = [];
        //         files.forEach(function(file) {
        //             var json_file = JSON.parse(file); //creates object
        //             let guildData = { 
        //                 "guildAllycode": json_file["guildAllycode"],
        //                 "fileName" : json_file["fileName"],
        //                 "id": json_file["id"],
        //                 "name": json_file["name"],
        //                 "desc": json_file["desc"],
        //                 "leader": json_file["leader"],
        //                 "members": json_file["members"],
        //                 "status": json_file["status"],
        //                 "required": json_file["required"],
        //                 "bannerColor": json_file["bannerColor"],
        //                 "bannerLogo": json_file["bannerLogo"],
        //                 "message": json_file["mesasge"],
        //                 "gp": json_file["gp"],
        //                 "raid": json_file["raid"],
        //                 "updated": json_file["updated"],
        //                 "updatedText": json_file["updatedText"],
        //                 "roster": json_file["roster"]
        //             }
        //             summaryFiles.push(guildData); 
        //         }) // end forEach

        //         mergedData = fileUtils.mergeNewData(apiGuildData, summaryFiles)

        //         fs.appendFile("./guilds/allguilds.json", JSON.stringify(summaryFiles, null, 4), function(err) {
        //             if(err) {
        //                 return console.log(err);
        //             }
        //             console.log("---THE allguilds.json FILE WAS UPDATED!");
        //         });
        //     })
        // } // end async function combineData


        //log the event to Discord (jcrAggie server) and the console
        fileUtils.logToDiscordAndConsole(client, message, args, Discord);
    }//end async execute
}//end module.exports