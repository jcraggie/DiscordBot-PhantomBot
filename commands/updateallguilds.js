// guided by code found at https://www.yaoyuyang.com/2017/01/20/nodejs-batch-file-processing.html
// adapted and edited for PhantomBot on 2021-06-19 by JCR

// const { merge } = require('@hapi/hoek');
// const writeguilds = require('./writeguilds.js');

module.exports = {
    name: 'updateallguilds',
    description: "combines all guild JSON files into 1 JSON file", //allguilds.json
    async execute(client, message, args, Discord,swapi, ApiSwgohHelp){
        var allyCodes = [135718294, 418877148, 924484782, 618277879, 993689571, 582412773, 315585918, 681711581, 166494741];
        // var allyCodes = [135718294, 418877148, 618277879]; //REBELLION EMPIRE ROGUE for testing
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

        const apiGuildData = await getAPIData();
        combineData(apiGuildData);

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

                // allyCodes is an allycode from 1 member for each guild, usually the leader. jcrAggie reps Rebellion
                // var allyCodes = [135718294, 418877148, 924484782, 618277879, 993689571, 582412773, 315585918, 681711581];
                // var allyCodes = [135718294, 418877148, 618277879]; //REBELLION EMPIRE ROGUE
                var apiGuildData = [];
                var fileGuildData = [];
                var newGuildData = [];
                var done = false;

                apiGuildData = await fileUtils.getNewData(client, message, args, Discord,swapi, ApiSwgohHelp, allyCodes);

                var x = 0;
                return apiGuildData;

            } // end finally
        } // end async

        async function combineData(apiGuildData) {
            var mergedData=[];

            // make Promise version of fs.readdir()
            fs.readdirAsync = function(dirname) {
                return new Promise(function(resolve, reject) {
                    fs.readdir(dirname, function(err, filenames){
                        if (err) 
                            reject(err); 
                        else 
                            resolve(filenames);
                    });
                });
            };
            
            // make Promise version of fs.readFile()
            fs.readFileAsync = function(filename, enc) {
                return new Promise(function(resolve, reject) {
                    fs.readFile(filename, enc, function(err, data){
                        if (err) 
                            reject(err); 
                        else
                            resolve(data);
                    });
                });
            };
            
            // utility function, return Promise
            function getFile(filename) {
                let fileData = fs.readFileAsync('./guilds/' + filename, 'utf8');
                return fileData;
            }
            
            
            // a function to filter out the guild files 
            function isDataFile(filename) {
                return (filename.split('.')[1] == 'json' 
                        && filename.split('.')[0] != 'allguilds'
                        && filename.split('.')[0] != 'allguilds_backup')
            }
            
            // start a blank allguilds.json file
            fs.writeFile('./guilds/allguilds.json', '', function(){
                    console.log('---BLANK allguilds.json FILE CREATED')
            });
            
            
            // read all json files in the directory, 
            //filter out those needed to process, 
            //and using Promise.all to time when all async readFiles has completed. 
            fs.readdirAsync('./guilds/').then(function (filenames){
                filenames = filenames.filter(isDataFile);
                console.log('---FILENAMES: ',filenames);
                return Promise.all(filenames.map(getFile));
            })
            .then(function (files){
                var summaryFiles = [];
                files.forEach(function(file) {
                    var json_file = JSON.parse(file); //creates object
                    let guildData = { 
                        "guildAllycode": json_file["guildAllycode"],
                        "fileName" : json_file["fileName"],
                        "id": json_file["id"],
                        "name": json_file["name"],
                        "desc": json_file["desc"],
                        "leader": json_file["leader"],
                        "members": json_file["members"],
                        "status": json_file["status"],
                        "required": json_file["required"],
                        "bannerColor": json_file["bannerColor"],
                        "bannerLogo": json_file["bannerLogo"],
                        "message": json_file["mesasge"],
                        "gp": json_file["gp"],
                        "raid": json_file["raid"],
                        "updated": json_file["updated"],
                        "updatedText": json_file["updatedText"],
                        "roster": json_file["roster"]
                    }
                    summaryFiles.push(guildData); 
                }) // end forEach

                mergedData = fileUtils.mergeNewData(apiGuildData, summaryFiles)

                fs.appendFile("./guilds/allguilds.json", JSON.stringify(summaryFiles, null, 4), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("---THE allguilds.json FILE WAS UPDATED!");
                });
            })
        } // end async function combineData
    }//end async execute
}//end module.exports