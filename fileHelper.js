//function code
const { GuildEmoji } = require('discord.js'); // I did not write this line; inserted by VS Code?
const fs = require("fs");



function jsonReader(filePath, callBack) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return callBack && callBack(err);
    }
    try {
      const object = JSON.parse(fileData);
      return callBack && callBack(null, object);
    } catch (err) {
      return callBack && callBack(err);
    }
  });
} //end jsonReader



function readGuildList() {
    //'readGuildList' returns a promise
    return new Promise(function (resolve, _reject) {
        //only 'readGuildList is able to resolve or reject the promise
        directoryPath = "./guilds/";
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                return console.log("Unable to scan directory: " + err);
            }
            //listing all files using forEach
            files.forEach(function (file) {
                // Do whatever you want to do with the file
            });

            resolve(files); //resolve the promise
        }); // end of fs.readdir
    }); // end of Promise
} // end function readGuildList



function getGuildFileNameByID(guildID) {
    const globalVar = require('./global.js');
    switch (guildID) {
        case globalVar.rebellionInfo.guildID:
            guildFileName = globalVar.rebellionInfo.guildJSON;
            return guildFileName;
        case "G215542000":
            guildFileName = "g_02_empire.json";
            return guildFileName;
        case "G1544326544":
            guildFileName = "g_03_havoc.json";
            return guildFileName;
        case "G4160520842":
            guildFileName = "g_04_rogue.json";
            return guildFileName;
        case "G1222943911":
            guildFileName = "g_05_order.json";
            return guildFileName;
        case "G295240225":
            guildFileName = "g_06_uprising.json";
            return guildFileName;
        case "G1625657735":
            guildFileName = "g_07_lotus.json";
            return guildFileName;
        case "G1428524841":
            guildFileName = "g_08_phoundlings.json";
            return guildFileName;
        case "G3204162424":
            guildFileName = "g_09_hope.json";
            return guildFileName;
    } //end switch
} // end getGuildFileName

function logToDiscord(client, message, args, Discord) {
    globalVar = require('./global.js');
    let msg = '`' + message.author.username + '` in #`'+ message.channel.name + '` sent: `' + message.content +'`';
    client.channels.cache.get(globalVar.discordChannels.log).send(msg);

} // end logToDiscord

function logToDiscordAndConsole(client, message, args, Discord) {
    
        globalVar = require('./global.js');
        let msg = '`' + message.author.username + '` in #`'+ message.channel.name + '` sent: `' + message.content +'`';
        client.channels.cache.get(globalVar.discordChannels.log).send(msg);
        console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);
    

} // end logToDiscordAndConsole


function getAllycodeByGuildName(guildName) {
    const globalVar = require('./global.js');
    switch (guildName) {
        case "rebellion":
            guildAlly = globalVar.rebellionInfo.allyCode;
            return guildAlly;
        case "empire":
            guildAlly = 418877148;
            return guildAlly;
        case "havoc":
            guildAlly = 924484782;
            return guildAlly;
        case "rogue":
            guildAlly = 618277879;
            return guildAlly;
        case "G1222943911":
            guildAlly = 993689571;
            return guildAlly;
        case "G295240225":
            guildAlly = 582412773;
            return guildAlly;
        case "G1625657735":
            guildAlly = 315585918;
            return guildAlly;
        case "G1428524841":
            guildAlly = 681711581;
            return guildAlly;
        case "hope":
            guildAlly = 166494741;
            return guildAlly;
    } //end switch
} // end getAllycodeByGuildName


async function getGuildFile(apiGuildData) {
    let index = 0;
    let testEnd = apiGuildData.length - 1;
    let allDone = false;
    var guildFileName = "";
    var guildID = "0";
    for (index; index < apiGuildData.length; index++) {
        //switch went here
        guildID = await getGuildID(apiGuildData, index);
        guildFileName = await fileUtils.getGuildFileNameByID(guildID);
        fileData = await readGuildFile("./guilds/" + guildFileName);
        fileGuildData = await pushToFileGuildData(fileGuildData, fileData); // push data from file into fileGuildData
        allDone = await allFilesRead(index, testEnd);
        if (index == testEnd) {
            return fileGuildData;
        }
    } // end for loop
} // end function getGuildFile



async function writeNewData(newGuildData) {
    let done = false;
    let index = 0;
    var writeFileName= '';
    for (index; index < newGuildData.length; index++) {
        writeFileName = newGuildData[index].fileName;
        fs.writeFile(writeFileName, JSON.stringify(newGuildData[index],null,2), err => {
            //check for errors
            if (err) throw err;
        })
    } // end for
    done = true;
    return done;
} // end writeNewData



async function getNewData (client, message, args, Discord,swapi, ApiSwgohHelp,allyCodes, isCron) {
    //iterate through loop, getting new data from the api.swgoh.help site and return it as apiGuildData
    x=0;
    var numGuilds = 0;
    var totalGuilds = allyCodes.length;
    var apiGuildData = [];
    console.log('---GETNEWDATA FOR NUMBER OF GUILDS: ', totalGuilds);
    console.log('---ALLYCODES: ', allyCodes);


    for(x; x < totalGuilds;) { // begin for loop
        numGuilds += 1;
        if(!isCron) message.channel.send('Reading guild # `' + numGuilds + '/' + totalGuilds + '` from swgoh.help...');
        console.log('---READING GUILD # ' + numGuilds + '/' + totalGuilds + ' from api.swgoh.help');
    
        let payload = {
            allycode: allyCodes[x],
            language: 'eng_us'
        };

        let { result, error, warning } = await swapi.fetchGuild(payload);
        if(error) {
            console.log('---API ERROR: ' + error);
            if(!isCron) message.channel.send('API error... this is **not** the way.');
            return;
        }
        if(warning) {
            console.log('---API WARNING: ' + warning);
        }

        let guildTemp = {
            "id" : result[0].id,
            "name" : result[0].name,
            "desc" : result[0].desc,
            "members" : result[0].members,
            "status" : result[0].status,
            "required" : result[0].required,
            "bannerColor" : result[0].bannerColor,
            "bannerLogo" : result[0].bannerLogo,
            "message" : result[0].message,
            "gp" : result[0].gp,
            "raid" : result[0].raid,
            "roster" : result[0].roster,
            "updated" : result[0].updated
        };
        if(!isCron) message.channel.send('...Received data for `' + guildTemp.name + '`!');
        console.log('------RECEIVED NEW DATA FOR ' + guildTemp.name);
        apiGuildData.push(guildTemp);
        x += 1; // move to next allyCode 
    } // end for loop - all new API data has been stored in apiGuildData
    return apiGuildData;
} // end function getNewData



function mergeData(apiGuildData, fileGuildData) {
    let aNum = apiGuildData.length;
    let fNum = fileGuildData.length;
    let mergedData = [];
    let newData = '';
    apiGuildData.forEach(function(apiguild) {
        let newData = apiGuildData.find(newData => newData.id == apiguild.id);
        if (!newData) return;
        let addLeader = fileGuildData.find(addLeader =>addLeader.id == apiguild.id);
        newData.leader = addLeader.leader;
        newData.fileName = addLeader.fileName;
        mergedData.push(newData);
        writeGuildFile(guildData);
    }); // endforEach fileGuildData
    return mergedData;
} // end function mergeData



function mergeNewData(apiGuildData, fileGuildData) {
                        
    let aNum = apiGuildData.length;
    let fNum = fileGuildData.length;
    let mergedData = [];
    let fileData = '';

    fileGuildData.forEach(function(fileguild) {
        let fileData = fileGuildData.find(fileData => fileData.id == fileguild.id);
        let apiData = apiGuildData.find(apiData =>apiData.id == fileguild.id);
        if(!apiData) {
            mergedData.push(fileData);
            return; // go to next iteration of forEach
        }

        for (var key in apiData) {
            if (apiData.hasOwnProperty(key)) {
                fileData[key] = apiData[key];
            }
        }
        writeGuildFile(fileData);
        mergedData.push(fileData);
    }); // endforEach fileGuildData
    return mergedData;
} // end function mergeNewData



function writeGuildFile(guildData) {
    var dateConvert = new Date(guildData["updated"] -18000); //convert epoch timestamp to CST date and time
    var localDate = dateConvert.toLocaleString(); //convert date and time to local
    guildData["updatedText"] = localDate;

    let guildID = guildData.id;
    let filename = getGuildFileNameByID(guildID);
    guildData["fileName"] = filename;                      
    let guildFileName = guildData["fileName"];
    let guildPath = './guilds/';
    
    fs.writeFile(guildPath + guildFileName, JSON.stringify(guildData, null, 4), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log('---THE FILE ' + guildFileName + ' WAS WRITTEN!');
    });
    return;
} // end function writeGuildFile



async function readGuildFile(guildPath) {
  fs.readFile(guildPath, 'utf8', (err, jsonString) => {
      console.log('---FS.READFILE in READGUILDFILE FUNCTION: ', guildPath);
      if (err) {
          console.log('---FILE READ FAILED: ', err);
          return;
      } // end if err
      try {
           fileData = JSON.parse(jsonString); // change JSON file to an object
           return fileData;
      } // end try
      catch (err) {
          console.log('---ERROR PARSING JSON STRING: ', err);
      } // catch err
  }) // end fs.readFile
} // end readGuildFile



async function getGuildID(apiGuildData, index) {
  return apiGuildData[index].id;
} // end getGuildID




async function pushToFileGuildData (fileGuildData, fileData) {
  fileGuildData.push(fileData);
  return fileGuildData;
} // end pushToFileGuildData




async function allFilesRead(index, testEnd) {
  if (index == testEnd) return true; 
  else return false;
} // end allFilesRead




async function createGuildEmbed(newGuildData) {
    let done = false;
    let index = 0;
    var globalVar = require('../global.js');
    let guildEmbed = globalVar.phantomBotHelp
        .setTitle('PHANTOM ALLIANCE GUILDS')
        .setDescription(" ")
    for (index; index < newGuildData.length; index++) {
        console.log('---CREATEGUIDEMBED index: ', index);

        var dateConvert = new Date(newGuildData[index].updated -18000); //convert epoch timestamp to CST date and time
        var localDate = dateConvert.toLocaleString(); //convert date and time to local
        var localGP = newGuildData[index].gp.toLocaleString("en-US"); //add commas to GP
        guildEmbed.addFields(
            {name: newGuildData[index].name, value: 'Members: `' + newGuildData[index].members + '` GP: `' + localGP + '`\nUpdated: `' + localDate + '`'},
        ) // end addFields
        
        
    } // end 1st for
    done = true;
    // message.channel.send(guildEmbed);
    // guildEmbed.fields=[] //clear the fields for the next use
    return guildEmbed;
} // end createGuildEmbed





//shows these functions to the outside world
module.exports = {
    jsonReader,
    readGuildList,
    getGuildFileNameByID,
    getGuildFile,
    writeNewData,
    getNewData,
    mergeData,
    readGuildFile,
    getGuildID,
    pushToFileGuildData,
    allFilesRead,
    createGuildEmbed,
    mergeNewData,
    writeGuildFile,
    getAllycodeByGuildName,
    logToDiscord,
    logToDiscordAndConsole

};