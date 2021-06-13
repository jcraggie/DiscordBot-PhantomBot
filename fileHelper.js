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
  return new Promise(function(resolve,_reject){
    //only 'readGuildList is able to resolve or reject the promise
    directoryPath = './guilds/';
    fs.readdir(directoryPath, function (err, files) {
      //handling error
      if (err) {
          return console.log('Unable to scan directory: ' + err);
      } 
      //listing all files using forEach
      files.forEach(function (file) {
          // Do whatever you want to do with the file
          //console.log('---READGUILDLIST FCN: ' + file);
        });

        resolve(files); //resolve the promise
        //console.log(files);
        
     });// end of fs.readdir
     
    });// end of Promise
}// end function readGuildList



//shows these functions to the outside world
module.exports = {
    // jsonReader(filePath, callBack)
    // jsonReader()
    jsonReader,
    //readGuildFiles,
    readGuildList

};